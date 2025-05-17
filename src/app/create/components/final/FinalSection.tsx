import { useState } from "react";
import Image from "next/image";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const PlatformSelection = [
  {
    id: -1,
    name: "Select Place to Deposit",
    avatar: "./vercel.svg",
  },
  {
    id: 0,
    name: "Self-Transfer",
    avatar: "/vercel.svg",
  },
  {
    id: 1,
    name: "Aave Protocol",
    avatar: "/aave.jpeg",
  },
  {
    id: 2,
    name: "Morpho Vaults",
    avatar: "/morpho.svg",
  },
  {
    id: 3,
    name: "Morpho Borrow Position",
    avatar: "/morpho.svg",
  },
];
export function FinalSection({
  updateDepositPlatform,
}: {
  updateDepositPlatform: (value: number) => void;
}) {
  const [selected, setSelected] = useState(PlatformSelection[0]);

  const updateValue = (value: { id: number; name: string; avatar: string }) => {
    if (value.id >= 0) {
      updateDepositPlatform(value.id);
    }
    setSelected(value);
  };

  return (
    <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
      <div className="columns-1">
        <Listbox value={selected} onChange={updateValue}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Deposit To: {selected.id >= 0 ? selected.name : ""}
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
              {PlatformSelection.map((platform) => (
                <ListboxOption
                  key={platform.id}
                  value={platform}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={platform.avatar}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {platform.name}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
            <HandleSection platformValue={selected.id} />
          </div>
        </Listbox>
      </div>
    </div>
  );
}

export function HandleSection({ platformValue }: { platformValue: number }) {
  if (platformValue == 1) {
    return <AaveDepositSection />;
  }
  if (platformValue > 1 && platformValue <= 1000) {
    return <MorphoVaultSection platformValue={platformValue} />;
  }
  return;
}

export function AaveDepositSection({}) {
  return (
    <>
      <br />
      <br />
      <div
        className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-bordered-success-style-label"
      >
        <div className="flex">
          <div className="shrink-0">
            {/* Icon */}
            <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </span>
            {/* End Icon */}
          </div>
          <div className="ms-3">
            <h3
              id="hs-bordered-success-style-label"
              className="text-gray-800 font-semibold dark:text-white"
            >
              Current Interest Rate : 3.45%
            </h3>
            <p className="text-sm text-gray-700 dark:text-neutral-400">
              Data Successfully Fetched.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const morphoVaults = [
  {
    id: -1,
    name: "Select Morpho Vault",
    avatar: "./morpho.svg",
  },
  {
    id: 3,
    name: "Spark USDC Vault",
    avatar: "/morpho.svg",
  },
  {
    id: 4,
    name: "Seamlesss USDC Vault",
    avatar: "/morpho.svg",
  },
  {
    id: 5,
    name: "Steakhouse Level USDC Vault",
    avatar: "./morpho.svg",
  },
];

export function MorphoVaultSection({
  platformValue,
}: {
  platformValue: number;
}) {
  console.log(platformValue);
  const [morphoVault, setmorphoVault] = useState(morphoVaults[0]);
  return (
    <>
      <br />
      <Listbox value={morphoVault} onChange={setmorphoVault}>
        <Label className="block text-sm/6 font-medium text-gray-900">
          Select Vault: {morphoVault.id >= 0 ? morphoVault.name : ""}
        </Label>
        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <Image
                width={400}
                height={400}
                alt=""
                src={morphoVault.avatar}
                className="size-5 shrink-0 rounded-full"
              />
              <span className="block truncate">{morphoVault.name}</span>
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
            {morphoVaults.map((vault) => (
              <ListboxOption
                key={vault.id}
                value={vault}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
              >
                <div className="flex items-center">
                  <Image
                    width={400}
                    height={400}
                    alt=""
                    src={vault.avatar}
                    className="size-5 shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                    {vault.name}
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
    </>
  );
}
