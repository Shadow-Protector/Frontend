import { useState, ChangeEvent } from "react";
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
import { ConditionData } from "../../data";
import { getChainlinkPriceData } from "../utils";
import { ConditionProps, ChainlinkFinalSectionProps } from "../../dataTypes";
import { base } from "viem/chains";

export function ChainlinkSection({
  conditionObject,
  updateConditionObject,
}: ConditionProps) {
  async function updatePriceFeed(priceFeed: {
    id: number;
    name: string;
    avatar: string;
    value: string;
  }) {
    console.log(priceFeed);

    const price = await getChainlinkPriceData(
      conditionObject.chainId.toString(),
      priceFeed.value,
    );

    setSelected(priceFeed);
    setAssetPrice(price);
    updateConditionObject("platformAddress", priceFeed.value);
  }

  const [selected, setSelected] = useState({
    id: 0,
    name: "Select Price Feed",
    avatar: "/vercel.svg",
    value: "0x0000000000000000000000000000000000000000",
  });

  const [assetPrice, setAssetPrice] = useState(BigInt(0));

  const array =
    ConditionData[conditionObject.chainId.toString()].platformAddress["0"];

  if (array == undefined) {
    return "EMPTY PRICE FEED DATA";
  }

  return (
    <>
      <Listbox value={selected} onChange={updatePriceFeed}>
        <Label className="block text-sm/6 font-medium text-gray-900">
          Select Price Feed: {selected.name}-
          {conditionObject.platform >= 0 ? conditionObject.platform : ""}
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
            {array.map((chain) => (
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
      <br />
      <ChainlinkFinalSelection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
        price={assetPrice}
      />
    </>
  );
}

function ChainlinkFinalSelection({
  conditionObject,
  updateConditionObject,
  price,
}: ChainlinkFinalSectionProps) {
  console.log(
    "ConditionData",
    ConditionData[conditionObject.chainId].parameterType["0"],
  );
  const listData = ConditionData[base.id.toString()].parameterType["0"];

  const [selected, setSelected] = useState({
    id: 0,
    name: "Select Condition",
    avatar: "/vercel.svg",
  });

  async function updateChainlinkCondition(value: {
    id: number;
    name: string;
    avatar: string;
  }) {
    console.log(value);
    updateConditionObject("parameter", value.id);
    setSelected(value);
  }

  async function updateChainlinkConditionValue(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = e.target;
    console.log(name, value);

    updateConditionObject("conditionValue", value);
  }

  if (price != BigInt(0)) {
    return (
      <>
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
                Asset Price : ${Number(price) / 100}
              </h3>
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Price Successfully Fetched.
              </p>
            </div>
          </div>
        </div>
        <br />
        <Listbox value={selected} onChange={updateChainlinkCondition}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Condition: {selected.name}- $
            {conditionObject.platform >= 0 ? price / BigInt(100) : ""}
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
              {listData.map((object) => (
                <ListboxOption
                  key={object.id}
                  value={object}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={object.avatar}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {object.name}
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
        <br />
        <div className="max-w-sm space-y-3">
          <div>
            <label
              htmlFor="conditionValue"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Execution Price : ${conditionObject.conditionValue}
            </label>
            <div className="relative">
              <input
                type="number"
                id="hs-input-with-leading-and-trailing-icon"
                name="conditionValue"
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                min="0"
                step="0.01"
                onChange={updateChainlinkConditionValue}
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

  return (
    <div
      className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
