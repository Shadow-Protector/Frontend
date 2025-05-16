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

import { FinalSectionProps } from "../../dataTypes";
import { FinalSectionData } from "../../data";

export function FinalSection({
  chainId,
  depositObject,
  updateDepositObject,
}: FinalSectionProps) {
  const [selected, setSelected] = useState({
    id: -1,
    name: "Select Deposit Platform",
    avatar: "/vercel.svg",
  });

  function updateDepositPlatform(platformValue: {
    id: number;
    name: string;
    avatar: string;
  }) {
    console.log(platformValue);
    // setSelected(platformValue);
  }

  if (chainId != 0) {
    const array: {
      id: number;
      name: string;
      avatar: string;
    }[] = FinalSectionData[chainId.toString()].PlatformSelection;
    if (array == undefined) {
      return;
    }
    return (
      <>
        <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
          <div className="columns-1">
            Select Deposit Platform on: {chainId} with{" "}
            {depositObject.depositPlatform}
            <Listbox value={selected} onChange={updateDepositPlatform}>
              <Label className="block text-sm/6 font-medium text-gray-900">
                Select Deposit Platform on: {chainId} with{" "}
                {depositObject.depositPlatform}
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
                  {array.map((item) => (
                    <ListboxOption
                      key={item.id}
                      value={item}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <div className="flex items-center">
                        <Image
                          width={400}
                          height={400}
                          alt=""
                          src={item.avatar}
                          className="size-5 shrink-0 rounded-full"
                        />
                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                          {item.name}
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
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
          <h3 className="text-gray-500 dark:text-neutral-400">
            Fill Out Steps 1 and 2.
          </h3>
        </div>
      </>
    );
  }
}
