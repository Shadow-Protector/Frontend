import { useState, ChangeEvent, useEffect } from "react";
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
import { ConditionData, AavePortfolioParameters } from "../../data";
import { getAavePortfolioData } from "../utils";
import { useAccount } from "wagmi";

import {
  ConditionProps,
  AavePortfolioFinalSectionProps,
} from "../../dataTypes";

export function AavePortfolioSection({
  conditionObject,
  updateConditionObject,
}: ConditionProps) {
  const [PortfolioData, setPortfolioData] = useState({
    totalCollateral: 0,
    totalDebt: 0,
    health: 0,
    value: false,
  });
  const { address } = useAccount();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (address) {
        console.log("rendering Data");
        const result = await getAavePortfolioData(
          conditionObject.chainId.toString(),
          address,
        );
        if (result.value) {
          setPortfolioData({
            totalCollateral: result.totalCollateral,
            totalDebt: result.totalDebt,
            health: result.health,
            value: true,
          });
        } else {
          setPortfolioData({
            totalCollateral: 0,
            totalDebt: 0,
            health: 0,
            value: false,
          });
        }
      }
    };
    fetchPortfolioData();
  }, [conditionObject.chainId, address]);

  return (
    <>
      <div className="columns-3">
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
                Total Collateral Value : ${PortfolioData.totalCollateral}
              </h3>
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Data Successfully Fetched.
              </p>
            </div>
          </div>
        </div>
        <br />
        <div
          className="bg-blue-200 border-t-2 border-blue-600 rounded-lg p-4 dark:bg-blue-800/30"
          role="alert"
          tabIndex={-1}
          aria-labelledby="hs-bordered-success-style-label"
        >
          <div className="flex">
            <div className="shrink-0">
              {/* Icon */}
              <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800 dark:border-blue-900 dark:bg-blue-800 dark:text-blue-400">
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
                Total Debt Value : ${PortfolioData.totalDebt}
              </h3>
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Data Successfully Fetched.
              </p>
            </div>
          </div>
        </div>
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
                Health Factor :
                {PortfolioData.health > 10 ** 30
                  ? "Infinite (No Borrow Position)"
                  : PortfolioData.health}
              </h3>
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Data Successfully Fetched.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AavePortfolioFinalSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
        value={PortfolioData.value}
      />
    </>
  );
}

function AavePortfolioFinalSection({
  conditionObject,
  updateConditionObject,
  value,
}: AavePortfolioFinalSectionProps) {
  const aavePortfolioParms = AavePortfolioParameters;

  const conditionData =
    ConditionData[conditionObject.chainId].parameterType["0"];

  const [aaveParamSelected, setaaveParamSelected] = useState(
    aavePortfolioParms[0],
  );

  const [conditionSelected, setconditionSelected] = useState({
    id: -1,
    name: "Select Condition",
    avatar: "/vercel.svg",
  });

  console.log(value);

  async function updateAaveParam(value: {
    id: number;
    name: string;
    avatar: string;
  }) {
    if (value.id != -1 && conditionSelected.id != -1) {
      console.log(
        "updateAaveParam: Parameter final Value:",
        value.id + conditionSelected.id,
      );
      updateConditionObject("parameter", value.id + conditionSelected.id);
      console.log("Updated Value", conditionObject.parameter);
    }
    setaaveParamSelected(value);
  }

  async function updateCondition(value: {
    id: number;
    name: string;
    avatar: string;
  }) {
    if (value.id != -1 && aaveParamSelected.id != -1) {
      console.log(
        "updateCondition: parameter final Value:",
        value.id + aaveParamSelected.id,
      );
      updateConditionObject("parameter", value.id + aaveParamSelected.id);
      console.log("Updated Value", conditionObject.parameter);
    }

    setconditionSelected(value);
  }

  async function updateAaveConditionValue(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);

    updateConditionObject("conditionValue", value);
  }

  return (
    <>
      <div className="columns-1">
        <Listbox value={aaveParamSelected} onChange={updateAaveParam}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Portfolio Parameter
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <Image
                  width={400}
                  height={400}
                  alt=""
                  src={aaveParamSelected.avatar}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="block truncate">{aaveParamSelected.name}</span>
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
              {aavePortfolioParms.map((params) => (
                <ListboxOption
                  key={params.id}
                  value={params}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={params.avatar}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {params.name}
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

        <Listbox value={conditionSelected} onChange={updateCondition}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Assigned to
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <Image
                  width={400}
                  height={400}
                  alt=""
                  src={conditionSelected.avatar}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="block truncate">{conditionSelected.name}</span>
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
              {conditionData.map((data) => (
                <ListboxOption
                  key={data.id}
                  value={data}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={data.avatar}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {data.name}
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
              htmlFor="conditionValue"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Execution Value : {conditionObject.conditionValue}
            </label>
            <div className="relative">
              <input
                type="number"
                id="hs-input-with-leading-and-trailing-icon"
                name="conditionValue"
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full bg-white border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-20 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                min="0"
                step="0.01"
                onChange={updateAaveConditionValue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
