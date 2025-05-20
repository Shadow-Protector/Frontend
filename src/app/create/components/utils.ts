import { readContract, writeContract } from "wagmi/actions";
import { writeContracts } from "@wagmi/core/experimental";
import { ContractData, AaveReserveTokens, MorphoVaultTokens } from "../data";
import { config } from "@/app/wagmi";

import { chainlinkABI } from "@/app/abi/chainlink";
import { lendingPoolABI } from "@/app/abi/aave/lendingPool";
import { tokenABI } from "@/app/abi/token";
import { deployerABI } from "@/app/abi/deployer";
import { factoryABI } from "@/app/abi/factory";
import { vaultABI } from "@/app/abi/vault";

// import { handlerABI } from "@/app/abi/handler";
import { ConditionOrderDetails, DepositOrderDetails } from "../dataTypes";
import { base } from "viem/chains";

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

async function getConditionValue(
  platform: number,
  parameter: number,
  conditionValue: string,
) {
  let result = BigInt(Number(conditionValue) * 100);
  // Aave OverAll portfolio
  if (platform == 1) {
    if (parameter <= 3) {
      result = result * BigInt(10 ** 6);
    } else {
      result = result * BigInt(10 ** 16);
    }
  }
  console.log(platform, parameter, result);
  return result;
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
  batchOperation: boolean,
) {
  try {
    // Creating Order
    console.log("Creating Order");
    console.log(conditionObject);

    let tipAmount = Number(conditionObject.tipTokenAmount);
    tipAmount = tipAmount * 10 ** conditionObject.decimal;

    const platformAddress = getPlatformAddresss(
      conditionObject.platform,
      conditionObject.platformAddress,
    );

    const conditionValueResult = await getConditionValue(
      conditionObject.platform,
      conditionObject.parameter,
      conditionObject.conditionValue,
    );

    const salt = getRandomIntInclusive(0, 10000);

    console.log(
      `platformAddres:${platformAddress} \n conditionValueResult:${conditionValueResult}`,
    );

    if (batchOperation) {
      await writeContracts(config, {
        contracts: [
          {
            address: conditionObject.tipTokenAddress as `0x${string}`,
            abi: tokenABI,
            functionName: "approve",
            args: [
              conditionObject.vaultAddress as `0x${string}`,
              BigInt(tipAmount),
            ],
          },
          {
            abi: vaultABI,
            address: conditionObject.vaultAddress as `0x${string}`,
            functionName: "createOrder",
            args: [
              conditionObject.platform,
              platformAddress as `0x${string}`,
              conditionObject.parameter,
              base.id,
              salt,
              conditionValueResult,
              conditionObject.tipTokenAddress as `0x${string}`,
              BigInt(tipAmount),
            ],
          },
        ],
      });
    } else {
      await writeContract(config, {
        abi: tokenABI,
        address: conditionObject.tipTokenAddress as `0x${string}`,
        functionName: "approve",
        args: [
          conditionObject.vaultAddress as `0x${string}`,
          BigInt(tipAmount),
        ],
      });
      await writeContract(config, {
        abi: vaultABI,
        address: conditionObject.vaultAddress as `0x${string}`,
        functionName: "createOrder",
        args: [
          conditionObject.platform,
          platformAddress as `0x${string}`,
          conditionObject.parameter,
          base.id,
          salt,
          conditionValueResult,
          conditionObject.tipTokenAddress as `0x${string}`,
          BigInt(tipAmount),
        ],
      });
    }

    console.log("Order Creation Done");

    const orderId = await readContract(config, {
      abi: vaultABI,
      address: conditionObject.vaultAddress as `0x${string}`,
      functionName: "generateKey",
      args: [
        conditionObject.platform,
        platformAddress as `0x${string}`,
        conditionObject.parameter,
        base.id,
        salt,
      ],
    });

    console.log("OrderId:", orderId);
    return orderId;
  } catch (e) {
    console.log(e);
  }
}

export async function callDepositTransaction(
  orderId: string,
  depositObject: DepositOrderDetails,
  platform: number,
  batchOperation: boolean,
) {
  console.log("Depositing Assets");
  try {
    let tokenAmount = Number(depositObject.tokenAmount);
    tokenAmount = tokenAmount * 10 ** depositObject.decimal;

    const swapToken = depositObject.depositTokenAddress;

    console.log("swap", swapToken);

    const [tokenType, baseToken] = getDepositTokenType(
      depositObject.depositTokenAddress,
    );
    const [platformId, repay] = getPlatformData(platform);
    let result = "";

    console.log("DepsositTransaction Params: Start");
    console.log("Approve", [
      depositObject.vaultAddress as `0x${string}`,
      BigInt(tokenAmount),
    ]);
    console.log("Deposit", [
      orderId as `0x${string}`,
      depositObject.depositTokenAddress as `0x${string}`,
      tokenType,
      swapToken as `0x${string}`,
      BigInt(tokenAmount),
      platformId,
      repay,
    ]);
    console.log("Deposit Params:END");

    if (batchOperation) {
      await writeContracts(config, {
        contracts: [
          {
            address: depositObject.depositTokenAddress as `0x${string}`,
            abi: tokenABI,
            functionName: "approve",
            args: [
              depositObject.vaultAddress as `0x${string}`,
              BigInt(tokenAmount),
            ],
          },
          {
            abi: vaultABI,
            address: depositObject.vaultAddress as `0x${string}`,
            functionName: "depositAsset",
            args: [
              orderId as `0x${string}`,
              baseToken as `0x${string}`,
              tokenType,
              baseToken as `0x${string}`,
              BigInt(tokenAmount),
              platformId,
              repay,
            ],
          },
        ],
      });
    } else {
      await writeContract(config, {
        abi: tokenABI,
        address: depositObject.depositTokenAddress as `0x${string}`,
        functionName: "approve",
        args: [
          depositObject.vaultAddress as `0x${string}`,
          BigInt(tokenAmount),
        ],
      });

      result = await writeContract(config, {
        abi: vaultABI,
        address: depositObject.vaultAddress as `0x${string}`,
        functionName: "depositAsset",
        args: [
          orderId as `0x${string}`,
          baseToken as `0x${string}`,
          tokenType,
          baseToken as `0x${string}`,
          BigInt(tokenAmount),
          platform,
          repay,
        ],
      });
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}

function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPlatformAddresss(platform: number, platformAddress: string) {
  if (platform == 0) return platformAddress;
  else if (platform == 1) return "0x0000000000000000000000000000000000000000";
  // TODO: ADD MORE PLATFORMS
  return platformAddress;
}

function getDepositTokenType(tokenAddress: string): [number, string] {
  for (const vault of MorphoVaultTokens) {
    if (vault.vault === tokenAddress) {
      return [vault.output, vault.baseToken];
    }
  }
  for (const aToken of AaveReserveTokens) {
    if (aToken.aToken === tokenAddress) {
      return [1, aToken.baseToken];
    }
  }
  return [0, tokenAddress];
}

function getPlatformData(platform: number): [number, boolean] {
  if (platform == 1) return [1, false];

  if (platform == 2) return [1, true];

  return [platform, false];
}
