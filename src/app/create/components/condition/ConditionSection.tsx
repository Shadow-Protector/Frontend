// import { ChangeEvent } from "react";

import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";
import {
  ConditionFormProps,
  ConditionFormInputProps,
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
    const listItem = ConditionData[conditionObject.chainId].platform.map(
      (object) => (
        <option key={object.id} value={object.id}>
          {object.name}
        </option>
      ),
    );
    return (
      <>
        Select Conditon Platform: {conditionObject.platform}
        <select
          name="platform"
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

function ConditionPlatformAddress({
  conditionObject,
  updateConditionObjectWithSelector,
}: ConditionFormSelectorProps) {
  console.log("Condition Platform", conditionObject.platform);
  if (conditionObject.platform >= 0) {
    console.log(
      "",
      ConditionData[conditionObject.chainId].platformAddress[
        conditionObject.platform
      ],
    );
    let array =
      ConditionData[conditionObject.chainId].platformAddress[
        conditionObject.platform
      ];
    console.log("Array", array);

    const listItem = array.map((object) => (
      <option key={object.id} value={object.value}>
        {object.name}
      </option>
    ));
    // console.log("Address Call", listItem);

    return (
      <>
        Select Condition Platform Address:{" "}
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
    return "WIP";
  }
  return;
}

function TipComponent({
  conditionObject,
  updateConditionObjectWithInput,
  updateConditionObjectWithSelector,
}: ConditionFormProps) {}
