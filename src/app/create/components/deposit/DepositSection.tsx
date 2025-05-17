import { ChangeEvent, useState } from "react";
import Image from "next/image";

import {
  Checkbox,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

import { useSwitchChain, useAccount } from "wagmi";
import { getVaultAddress, deployVault } from "../utils";

import {
  DepositOrderProps,
  DepositOrderTokenDataProps,
  TokenDataType,
} from "../../dataTypes";
import { chainConfiguration } from "../../data";

export function DepositSection({
  depositObject,
  updateDepositObject,
}: DepositOrderProps) {
  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  const [selected, setSelected] = useState(chainConfiguration[0]);
  const [tokenData, setTokenData] = useState([{}]);

  async function updateChainId(chain: {
    id: string;
    name: string;
    avatar: string;
  }) {
    console.log(chain);
    switchChain({ chainId: Number(chain.id) });

    if (address) {
      let vaultAddress = await getVaultAddress(chain.id, address);
      console.log("User Vault", vaultAddress);
      if (vaultAddress == "0x0000000000000000000000000000000000000000") {
        console.log("Need to deploy vault");
        await deployVault(chain.id);

        vaultAddress = await getVaultAddress(chain.id, address);
        console.log("New User Vault", vaultAddress);
      }
      setSelected(chain);
      if (vaultAddress) {
        updateDepositObject("chainId", chain.id);
        updateDepositObject("vaultAddress", vaultAddress);
      }
      const params = new URLSearchParams();
      params.append("chain", chain.id);
      params.append("address", address);

      // Calling Tokens Endpoint
      fetch(`/api/moralis?${params}`)
        .then((res) => res.json())
        .then((data) => setTokenData(data));
    }
  }

  return (
    <>
      <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
        <div className="columns-1">
          <h4 className="text-gray-500 dark:text-neutral-400">Deposit Asset</h4>
          <div>
            <Listbox value={selected} onChange={updateChainId}>
              <Label className="block text-sm/6 font-medium text-gray-900">
                Chain Selected: {selected.name}-{depositObject.chainId}
              </Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={selected.avatar}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="block truncate">{selected.name}</span>
                  </span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {chainConfiguration.map((chain) => (
                    <ListboxOption
                      key={chain.id}
                      value={chain}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <div className="flex items-center">
                        <Image
                          width={400}
                          height={400}
                          alt=""
                          src={chain.avatar}
                          className="size-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                          {chain.name}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          <br />
          <DepositTokenComponent
            depositObject={depositObject}
            updateDepositObject={updateDepositObject}
            tokenData={tokenData}
          />
          <SwapComponent
            depositObject={depositObject}
            updateDepositObject={updateDepositObject}
          />
        </div>
      </div>
    </>
  );
}

function DepositTokenComponent({
  depositObject,
  updateDepositObject,
  tokenData,
}: DepositOrderTokenDataProps) {
  const [maxBalance, setmaxBalance] = useState(0);

  const [selected, setSelected] = useState({
    name: "Select Tip Token",
    symbol: "STP",
    thumbnail: "/coin.png",
    token_address: "0x",
  });

  async function updateDepositTokenAddress(token: TokenDataType) {
    if (token.balance && token.decimals) {
      setmaxBalance(Number(token.balance) / 10 ** token.decimals);
    }
    updateDepositObject(
      "depositTokenAddress",
      token.token_address ? token.token_address : "0x",
    );
    updateDepositObject("decimal", token.decimals ? token.decimals : 0);
    setSelected({
      name: token.name ? token.name : "",
      symbol: token.symbol ? token.symbol : "",
      thumbnail: token.thumbnail ? token.thumbnail : "/coin.png",
      token_address: token.token_address ? token.token_address : "0x",
    });
  }
  async function updateTokenAmount(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    updateDepositObject("tokenAmount", value);
  }

  if (depositObject.chainId != 0 && Object.keys(tokenData[0]).length !== 0) {
    return (
      <>
        <Listbox value={selected} onChange={updateDepositTokenAddress}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Deposit Token Address: {depositObject.depositTokenAddress}
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <Image
                  width={400}
                  height={400}
                  alt=""
                  src={selected.thumbnail}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="block truncate">
                  {selected.name}({selected.symbol})
                </span>
              </span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
            >
              {tokenData.map((token) => (
                <ListboxOption
                  key={token.name}
                  value={token}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={token.thumbnail ? token.thumbnail : "/coin.png"}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {token.name}({token.symbol})
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <br />
        <div className="max-w-sm space-y-3">
          <div>
            <label
              htmlFor="tokenAmount"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Value: {depositObject.tokenAmount} (Max: {maxBalance})
            </label>
            <div className="relative">
              <input
                type="number"
                id="hs-input-with-leading-and-trailing-icon"
                name="tokenAmount"
                max={maxBalance}
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                onChange={updateTokenAmount}
              />
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
  updateDepositObject,
}: DepositOrderProps) {
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
              <Label>Swap Token (Powered by Aerodrome on Base)</Label>
            </Field>
          </div>
          <br />
          <SwapSelector
            depositObject={depositObject}
            updateDepositObject={updateDepositObject}
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
              <Label>Swap Token (Powered by Aerodrome on Base)</Label>
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
  updateDepositObject,
}: DepositOrderProps) {
  async function updateSwapTokenAddress(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    updateDepositObject("convertTokenAddress", value);
  }

  return (
    <>
      Select Swap Output Token: {depositObject.convertTokenAddress}
      <select
        name="convertTokenAddress"
        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        onChange={updateSwapTokenAddress}
      >
        <option value={""}>Select Token</option>
        <option value={"0x036cbd53842c5426634e7929541ec2318f3dcf7e"}>
          USDC
        </option>
      </select>
    </>
  );
}
