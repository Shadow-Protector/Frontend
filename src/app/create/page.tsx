"use client";
import { useState } from "react";

import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

import { ConditionOrderDetails, DepositOrderDetails } from "./dataTypes";
import Navbar from "../components/nav/Navbar";
import { ConditionSection } from "./components/condition/ConditionSection";
import { DepositSection } from "./components/deposit/DepositSection";
import { FinalSection } from "./components/final/FinalSection";

import {
  createOrderTransaction,
  callDepositTransaction,
} from "./components/utils";
import { arbitrum } from "viem/chains";
export default function Page() {
  const { address } = useAccount();
  const { data: capabilities } = useCapabilities();
  const [platform, setPlatform] = useState(-1);

  if (capabilities) {
    console.log(capabilities[arbitrum.id]["atomicBatch"]["supported"]);
  }

  const [conditionObject, setConditionObject] = useState<ConditionOrderDetails>(
    {
      chainId: 0,
      vaultAddress: "",
      platform: -1,
      platformAddress: "",
      parameter: -1,
      conditionValue: "",
      tipTokenAddress: "",
      decimal: 0,
      tipTokenAmount: "",
    },
  );

  const [depositObject, setDepositObject] = useState<DepositOrderDetails>({
    chainId: 0,
    vaultAddress: "",
    depositTokenAddress: "",
    depositTokenType: 0,
    convertTokenAddress: "",
    decimal: 0,
    tokenAmount: "",
    repay: 0,
  });

  const updateDepositPlatform = (value: number) => {
    if (value >= 0) {
      setPlatform(value);
    }
  };

  const updateConditionObject = (
    key: keyof ConditionOrderDetails,
    value: string | number,
  ) => {
    setConditionObject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateDepositObject = (
    key: keyof DepositOrderDetails,
    value: string | number,
  ) => {
    setDepositObject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  async function createOrder() {
    console.log("Creating Order");
    console.log("Condition", conditionObject);
    console.log("Deposit Object", depositObject);
    console.log("Platform", platform);
    if (address) {
      let batchOperations = false;
      if (
        capabilities &&
        capabilities[conditionObject.chainId]["atomicBatch"]["supported"]
      ) {
        batchOperations = true;
      }

      const orderId = await createOrderTransaction(
        address,
        conditionObject,
        batchOperations,
      );
      if (orderId) {
        const result = await callDepositTransaction(
          orderId,
          depositObject,
          platform,
          batchOperations,
        );
        if (result) {
          console.log("Deposit Operation", result);
        }
      }
    }
  }

  function resetOrder() {
    console.log("Reset Order");

    setConditionObject({
      chainId: 0,
      vaultAddress: "",
      platform: -1,
      platformAddress: "",
      parameter: -1,
      conditionValue: "",
      tipTokenAddress: "",
      tipTokenAmount: "",
      decimal: 0,
    });

    setDepositObject({
      chainId: 0,
      vaultAddress: "",
      depositTokenAddress: "",
      depositTokenType: 0,
      convertTokenAddress: "",
      decimal: 0,
      tokenAmount: "",
      repay: 0,
    });
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto m-15">
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
          {/* Stepper */}
          <div data-hs-stepper="">
            {/* Stepper Nav */}
            <ul className="relative flex flex-row gap-x-2">
              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{
              "index": 1
            }'
              >
                <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                    <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                      1
                    </span>
                    <svg
                      className="hidden shrink-0 size-3 hs-stepper-success:block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="ms-2 text-sm font-medium text-gray-800 dark:text-white">
                    Step
                  </span>
                </span>
                <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-600 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
              </li>

              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{
              "index": 2
            }'
              >
                <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                    <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                      2
                    </span>
                    <svg
                      className="hidden shrink-0 size-3 hs-stepper-success:block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="ms-2 text-sm font-medium text-gray-800 dark:text-white">
                    Step
                  </span>
                </span>
                <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-600 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
              </li>

              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{
                "index": 3
              }'
              >
                <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:hs-stepper-active:bg-blue-500 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                    <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                      3
                    </span>
                    <svg
                      className="hidden shrink-0 size-3 hs-stepper-success:block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="ms-2 text-sm font-medium text-gray-800 dark:text-white">
                    Step
                  </span>
                </span>
                <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-600 dark:hs-stepper-success:bg-blue-500 dark:hs-stepper-completed:bg-teal-500"></div>
              </li>
              {/* End Item */}
            </ul>
            {/* End Stepper Nav */}

            {/* Stepper Content */}
            <div className="mt-5 sm:mt-8">
              {/* First Content */}
              <div
                data-hs-stepper-content-item='{
              "index": 1
            }'
              >
                <ConditionSection
                  conditionObject={conditionObject}
                  updateConditionObject={updateConditionObject}
                />
              </div>
              {/* End First Content */}

              {/* Second Content */}
              <div
                data-hs-stepper-content-item='{
              "index": 2
            }'
                style={{ display: "none" }}
              >
                <DepositSection
                  depositObject={depositObject}
                  updateDepositObject={updateDepositObject}
                />
              </div>
              {/* End Second Content */}

              {/* Third Content */}
              <div
                data-hs-stepper-content-item='{
              "index": 3
            }'
                style={{ display: "none" }}
              >
                <FinalSection updateDepositPlatform={updateDepositPlatform} />
              </div>
              {/* End First Content */}

              {/* Final Content */}
              <div
                data-hs-stepper-content-item='{
              "isFinal": true
            }'
                style={{ display: "none" }}
              >
                <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
                  <h3 className="text-gray-500 dark:text-neutral-400">
                    Order Submitted
                  </h3>
                </div>
              </div>
              {/* End Final Content */}

              {/* Button Group */}
              <div className="mt-5 flex justify-between items-center gap-x-2">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-stepper-back-btn=""
                >
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
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-stepper-next-btn=""
                >
                  Next
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
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-stepper-finish-btn=""
                  style={{ display: "none" }}
                  onClick={createOrder}
                >
                  Create Order
                </button>
                <button
                  type="reset"
                  className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-stepper-reset-btn=""
                  style={{ display: "none" }}
                  onClick={resetOrder}
                >
                  Reset
                </button>
              </div>
              {/* End Button Group */}
            </div>
            {/* End Stepper Content */}
          </div>
          {/* End Stepper */}
        </div>
      </div>
    </>
  );
}
