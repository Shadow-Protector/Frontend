import { readContract, writeContract } from "wagmi/actions";
import { ContractData } from "../data";
import { config } from "@/app/wagmi";

import { deployerABI } from "@/app/abi/deployer";
import { factoryABI } from "@/app/abi/factory";
// import { handlerABI } from "@/app/abi/handler";
import { chainlinkABI } from "@/app/abi/chainlink";
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
