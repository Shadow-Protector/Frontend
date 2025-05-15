import { readContract, writeContract } from "wagmi/actions";
import { ContractData } from "../data";
import { config } from "@/app/wagmi";

import { deployerABI } from "@/app/abi/deployer";
import { factoryABI } from "@/app/abi/factory";

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
