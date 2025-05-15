import { Checkbox, Field, Label } from "@headlessui/react";
import { useState, ChangeEvent } from "react";

import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";
import { useSwitchChain, useAccount } from "wagmi";
import { getVaultAddress, deployVault } from "../utils";

import {
  DepositFormProps,
  DepositFormSelectorProps,
  DepositOrderProps,
} from "../../dataTypes";

export function DepositSection({
  depositObject,
  updateDepositObjectWithInput,
  updateDepositObjectWithSelector,
  updateDepositObject,
}: DepositOrderProps) {
  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  async function updateChainId(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    switchChain({ chainId: Number(value) });

    if (address) {
      let vaultAddress = await getVaultAddress(value, address);
      console.log("User Vault", vaultAddress);
      if (vaultAddress == "0x0000000000000000000000000000000000000000") {
        console.log("Need to deploy vault");
        await deployVault(value);

        vaultAddress = await getVaultAddress(value, address);
        console.log("New User Vault", vaultAddress);
      }

      updateDepositObject("chainId", value);
      updateDepositObject("vaultAddress", vaultAddress);
    }
  }

  return (
    <>
      <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
        <div className="columns-1">
          <h4 className="text-gray-500 dark:text-neutral-400">Deposit Asset</h4>
          Select Chain: {depositObject.chainId}
          <select
            name="chainId"
            className="py-5 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onChange={updateChainId}
          >
            <option value={0}>Select Chain</option>
            <option value={baseSepolia.id}>Base</option>
            <option value={sepolia.id}>Arbitrum</option>
            <option value={avalancheFuji.id}>Avalanche</option>
          </select>
          <DepositTokenComponent
            depositObject={depositObject}
            updateDepositObjectWithInput={updateDepositObjectWithInput}
            updateDepositObjectWithSelector={updateDepositObjectWithSelector}
          />
          <SwapComponent
            depositObject={depositObject}
            updateDepositObjectWithSelector={updateDepositObjectWithSelector}
          />
        </div>
      </div>
    </>
  );
}

function DepositTokenComponent({
  depositObject,
  updateDepositObjectWithInput,
  updateDepositObjectWithSelector,
}: DepositFormProps) {
  if (depositObject.chainId != 0) {
    return (
      <>
        Select Deposit Token Address: {depositObject.depositTokenAddress}
        <select
          name="depositTokenAddress"
          className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          onChange={updateDepositObjectWithSelector}
        >
          <option value={""}>Select Token</option>
          <option value={"asda"}>USDC</option>
        </select>
        <br />
        <div className="max-w-sm space-y-3">
          <div>
            <label
              htmlFor="tokenAmount"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Value: {depositObject.tokenAmount}
            </label>
            <div className="relative">
              <input
                type="text"
                id="hs-input-with-leading-and-trailing-icon"
                name="tokenAmount"
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                onChange={updateDepositObjectWithInput}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <span className="text-gray-500 dark:text-neutral-500">$</span>
              </div>
              <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                <span className="text-gray-500 dark:text-neutral-500">USD</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return;
}

function SwapComponent({
  depositObject,
  updateDepositObjectWithSelector,
}: DepositFormSelectorProps) {
  const [enabled, setEnabled] = useState(false);
  if (depositObject.depositTokenAddress != "") {
    if (enabled) {
      return (
        <>
          <br />
          <div>
            <Field className="flex items-center gap-2">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-checked:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label>Swap Token</Label>
            </Field>
          </div>
          <br />
          <SwapSelector
            depositObject={depositObject}
            updateDepositObjectWithSelector={updateDepositObjectWithSelector}
          />
        </>
      );
    } else {
      return (
        <>
          <br />
          <div>
            <Field className="flex items-center gap-2">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-checked:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label>Swap Token</Label>
            </Field>
          </div>
          <br />
        </>
      );
    }
  }
  return;
}

function SwapSelector({
  depositObject,
  updateDepositObjectWithSelector,
}: DepositFormSelectorProps) {
  return (
    <>
      Select Swap Output Token: {depositObject.convertTokenAddress}
      <select
        name="convertTokenAddress"
        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        onChange={updateDepositObjectWithSelector}
      >
        <option value={""}>Select Token</option>
        <option value={"asda"}>USDC</option>
      </select>
    </>
  );
}
