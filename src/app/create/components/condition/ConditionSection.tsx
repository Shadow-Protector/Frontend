// import { ChangeEvent } from "react";

import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";
import {
  ConditionFormProps,
  ConditionFormSelectorProps,
} from "../../dataTypes";
import { ConditionData } from "../../data";

export function ConditionSection({
  conditionObject,
  updateConditionObjectWithInput,
  updateConditionObjectWithSelector,
}: ConditionFormProps) {
  return (
    <>
      <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
        <div className="columns-1">
          <h4 className="text-gray-500 dark:text-neutral-400">
            Create Order Condition
          </h4>
          Select Chain: {conditionObject.chainId}
          <select
            name="chainId"
            className="py-5 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onChange={updateConditionObjectWithSelector}
          >
            <option value={0}>Select Chain</option>
            <option value={baseSepolia.id}>Base</option>
            <option value={sepolia.id}>Arbitrum</option>
            <option value={avalancheFuji.id}>Avalanche</option>
          </select>
          <ConditionPlatform
            conditionObject={conditionObject}
            updateConditionObjectWithSelector={
              updateConditionObjectWithSelector
            }
          />
          <ConditionPlatformAddress
            conditionObject={conditionObject}
            updateConditionObjectWithSelector={
              updateConditionObjectWithSelector
            }
          />
          <ConditionParamterType
            conditionObject={conditionObject}
            updateConditionObjectWithSelector={
              updateConditionObjectWithSelector
            }
            updateConditionObjectWithInput={updateConditionObjectWithInput}
          />
        </div>
      </div>
    </>
  );
}

function ConditionPlatform({
  conditionObject,
  updateConditionObjectWithSelector,
}: ConditionFormSelectorProps) {
  if (conditionObject.chainId != 0) {
    let array = ConditionData[conditionObject.chainId].platform;
    if (array == undefined) {
      return;
    }
    const listItem = array.map((object) => (
      <option key={object.id} value={object.id}>
        {object.name}
      </option>
    ));
    return (
      <>
        Select Condition Platform:
        {conditionObject.platform >= 0 ? conditionObject.platform : ""}
        <select
          name="platform"
          className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          onChange={updateConditionObjectWithSelector}
        >
          <option value={-1}>Select Platform</option>
          {listItem}
        </select>
        <br />
      </>
    );
  }
  return;
}

function ConditionPlatformAddress({
  conditionObject,
  updateConditionObjectWithSelector,
}: ConditionFormSelectorProps) {
  console.log("Condition Platform", conditionObject.platform);
  if (conditionObject.platform >= 0) {
    let array =
      ConditionData[conditionObject.chainId].platformAddress[
        conditionObject.platform
      ];

    if (array == undefined) {
      return;
    }

    const listItem = array.map((object) => (
      <option key={object.id} value={object.value}>
        {object.name}
      </option>
    ));
    // console.log("Address Call", listItem);

    return (
      <>
        Select Condition Platform Address:
        {`${conditionObject.platformAddress?.slice(0, 4)}..${conditionObject.platformAddress?.slice(-4)}`}
        <select
          name="platformAddress"
          className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          onChange={updateConditionObjectWithSelector}
        >
          <option>Select Platform</option>
          {listItem}
        </select>
        <br />
      </>
    );
  }

  return;
}

function ConditionParamterType({
  conditionObject,
  updateConditionObjectWithInput,
  updateConditionObjectWithSelector,
}: ConditionFormProps) {
  if (conditionObject.platform >= 0 && conditionObject.platformAddress != "") {
    console.log(
      "",
      ConditionData[conditionObject.chainId].parameterType[
        conditionObject.platform
      ],
    );

    const array =
      ConditionData[conditionObject.chainId].parameterType[
        conditionObject.platform
      ];

    if (array == undefined) {
      return;
    }

    const listItem = array.map((object: { id: number; name: string }) => (
      <option key={object.id} value={object.id}>
        {object.name}
      </option>
    ));

    return (
      <>
        Select Condition:
        {conditionObject.parameter >= 0 ? conditionObject.parameter : ""}
        <select
          name="parameter"
          className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          onChange={updateConditionObjectWithSelector}
        >
          <option value={-1}>Select Condition</option>
          {listItem}
        </select>
        <br />
        <div className="max-w-sm space-y-3">
          <div>
            <label
              htmlFor="conditionValue"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Value: {conditionObject.conditionValue}
            </label>
            <div className="relative">
              <input
                type="text"
                id="hs-input-with-leading-and-trailing-icon"
                name="conditionValue"
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                onChange={updateConditionObjectWithInput}
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

function TipComponent({
  conditionObject,
  updateConditionObjectWithInput,
  updateConditionObjectWithSelector,
}: ConditionFormProps) {}
