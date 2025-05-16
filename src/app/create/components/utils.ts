import { readContract, writeContract, switchChain } from "wagmi/actions";
import { writeContracts } from "@wagmi/core/experimental";
import { ContractData } from "../data";
import { config } from "@/app/wagmi";

import { chainlinkABI } from "@/app/abi/chainlink";
import { lendingPoolABI } from "@/app/abi/aave/lendingPool";
import { tokenABI } from "@/app/abi/token";
import { deployerABI } from "@/app/abi/deployer";
import { factoryABI } from "@/app/abi/factory";
import { vaultABI } from "@/app/abi/vault";

// import { handlerABI } from "@/app/abi/handler";
import { ConditionOrderDetails } from "../dataTypes";
import { base, arbitrum, avalanche } from "viem/chains";

export async function getVaultAddress(chainId: string, address: string) {
  try {
    const factoryAddress: string = ContractData[chainId].factory;
    console.log("Factory", factoryAddress);

    const result = await readContract(config, {
      abi: factoryABI,
      address: factoryAddress as `0x${string}`,
      functionName: "getVault",
      args: [address as `0x${string}`],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getChainlinkPriceData(
  chainId: string,
  priceFeed: string,
) {
  try {
    const priceFeedData = await readContract(config, {
      abi: chainlinkABI,
      address: priceFeed as `0x${string}`,
      functionName: "latestRoundData",
    });

    const decimals = await readContract(config, {
      abi: chainlinkABI,
      address: priceFeed as `0x${string}`,
      functionName: "decimals",
    });

    if (priceFeed && decimals) {
      console.log(priceFeedData);
      console.log(decimals);

      const result =
        (priceFeedData[1] * BigInt(100)) / BigInt(10) ** BigInt(decimals);
      console.log(result);
      return result;
    }
    return BigInt(0);
  } catch (e) {
    console.log(e);
    return BigInt(0);
  }
}

export async function getAavePortfolioData(chainId: string, address: string) {
  try {
    const lendingPoolAddress = ContractData[chainId].aavePool;

    console.log("lendingPoolAddress", lendingPoolAddress);

    const portfolioData = (await readContract(config, {
      abi: lendingPoolABI,
      address: lendingPoolAddress as `0x${string}`,
      functionName: "getUserAccountData",
      args: [address as `0x${string}`],
    })) as [
      bigint, // totalCollateral
      bigint, // totalDebt
      bigint, // availableBorrows
      bigint, // liquidationThreshold
      bigint, // ltv
      bigint, // healthFactor
    ];
    return {
      totalCollateral: Number(portfolioData[0]) / 10 ** 8,
      totalDebt: Number(portfolioData[1]) / 10 ** 8,
      health: Number(portfolioData[5]) / 10 ** 18,
      value: true,
    };
  } catch (e) {
    console.log(e);
    return {
      totalCollateral: 0,
      totalDebt: 0,
      health: 0,
      value: false,
    };
  }
}
// before borrow - 10106195191n, 0n, 7579646393n, 7800n, 7500n, 115792089237316195423570985008687907853269984665640564039457584007913129639935n
// after borrow  - 10106199890n, 2800498746n, 4779151172n, 7800n, 7500n, 2814797158991479156n
// after borrow  - 10106202390n, 2805871527n, 4773780266n, 7800n, 7500n, 2809407981850196807n
export async function deployVault(chainId: string) {
  try {
    const deployerAddress: string = ContractData[chainId].deployer;
    console.log("Deployer", deployerAddress);

    await writeContract(config, {
      abi: deployerABI,
      address: deployerAddress as `0x${string}`,
      functionName: "deployVault",
    });
  } catch (e) {
    console.log(e);
  }
}

export async function createOrderTransaction(
  address: string,
  conditionObject: ConditionOrderDetails,
) {
  try {
    // Creating Order
    console.log("Creating Order");
    console.log(conditionObject.chainId, base.id);
    if (
      conditionObject.chainId == base.id ||
      conditionObject.chainId == avalanche.id ||
      conditionObject.chainId == arbitrum.id
    ) {
      await switchChain(config, { chainId: conditionObject.chainId });
      await writeContract(config, {
        abi: tokenABI,
        address: conditionObject.tipTokenAddress as `0x${string}`,
        functionName: "approve",
        args: [conditionObject.vaultAddress as `0x${string}`, BigInt(100)],
      });
      await writeContract(config, {
        abi: vaultABI,
        address: conditionObject.vaultAddress as `0x${string}`,
        functionName: "createOrder",
        args: [
          conditionObject.platform,
          conditionObject.platformAddress as `0x${string}`,
          conditionObject.parameter,
          base.id,
          0,
          BigInt(Number(conditionObject.conditionValue)),
          conditionObject.tipTokenAddress as `0x${string}`,
          BigInt(100),
        ],
      });

      const salt = getRandomIntInclusive(0, 10000);

      await writeContracts(config, {
        contracts: [
          {
            address: conditionObject.tipTokenAddress as `0x${string}`,
            abi: tokenABI,
            functionName: "approve",
            args: [conditionObject.vaultAddress as `0x${string}`, BigInt(100)],
          },
          {
            abi: vaultABI,
            address: conditionObject.vaultAddress as `0x${string}`,
            functionName: "createOrder",
            args: [
              conditionObject.platform,
              conditionObject.platformAddress as `0x${string}`,
              conditionObject.parameter,
              base.id,
              salt,
              BigInt(Number(conditionObject.conditionValue)),
              conditionObject.tipTokenAddress as `0x${string}`,
              BigInt(100),
            ],
          },
        ],
      });

      console.log("Order Creation Done");

      const orderId = await readContract(config, {
        abi: vaultABI,
        address: conditionObject.vaultAddress as `0x${string}`,
        functionName: "generateKey",
        args: [
          conditionObject.platform,
          conditionObject.platformAddress as `0x${string}`,
          conditionObject.parameter,
          base.id,
          salt,
        ],
      });

      console.log("OrderId:", orderId);
    }
  } catch (e) {
    console.log(e);
  }
}

function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
