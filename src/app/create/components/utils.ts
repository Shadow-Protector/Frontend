import { readContract, writeContract, switchChain } from "wagmi/actions";
import { writeContracts } from "@wagmi/core/experimental";
import { ContractData } from "../data";
import { config } from "@/app/wagmi";

import { chainlinkABI } from "@/app/abi/chainlink";
import { tokenABI } from "@/app/abi/token";
import { deployerABI } from "@/app/abi/deployer";
import { factoryABI } from "@/app/abi/factory";
import { vaultABI } from "@/app/abi/vault";

// import { handlerABI } from "@/app/abi/handler";
import { ConditionOrderDetails, DepositOrderDetails } from "../dataTypes";
import { avalancheFuji, baseSepolia, sepolia } from "viem/chains";
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
    // const handlerAddress: string = ContractData[chainId].factory;
    // console.log("Handler", handlerAddress);

    // const result = await readContract(config, {
    //   abi: handlerABI,
    //   address: handlerAddress as `0x${string}`,
    //   functionName: "getChainlinkData",
    //   args: [priceFeed as `0x${string}`],
    // });

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
  depositObject: DepositOrderDetails,
) {
  try {
    // Creating Order
    console.log("Creating Order");
    console.log(conditionObject.chainId, baseSepolia.id);
    if (
      conditionObject.chainId == baseSepolia.id ||
      conditionObject.chainId == avalancheFuji.id ||
      conditionObject.chainId == sepolia.id
    ) {
      // await switchChain(config, { chainId: conditionObject.chainId });
      // await writeContract(config, {
      //   abi: tokenABI,
      //   address: conditionObject.tipTokenAddress as `0x${string}`,
      //   functionName: "approve",
      //   args: [conditionObject.vaultAddress as `0x${string}`, BigInt(100)],
      // });
      // await writeContract(config, {
      //   abi: vaultABI,
      //   address: conditionObject.vaultAddress as `0x${string}`,
      //   functionName: "createOrder",
      //   args: [
      //     conditionObject.platform,
      //     conditionObject.platformAddress as `0x${string}`,
      //     conditionObject.parameter,
      //     baseSepolia.id,
      //     0,
      //     BigInt(Number(conditionObject.conditionValue)),
      //     conditionObject.tipTokenAddress as `0x${string}`,
      //     BigInt(100),
      //   ],
      // });

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
              baseSepolia.id,
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
          baseSepolia.id,
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
