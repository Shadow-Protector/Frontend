import { FinalSectionProps } from "../../dataTypes";
import { FinalSectionData } from "../../data";

export function FinalSection({
  chainId,
  depositObject,
  updateDepositObjectWithSelector,
}: FinalSectionProps) {
  if (chainId != 0) {
    const array: {
      id: number;
      name: string;
    }[] = FinalSectionData[chainId.toString()].PlatformSelection;
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
        <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
          <div className="columns-1">
            Select Deposit Platform on: {chainId} with{" "}
            {depositObject.depositPlatform}
            <select
              name="depositPlatform"
              className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              onChange={updateDepositObjectWithSelector}
            >
              <option value={-1}>Select Platform</option>
              {listItem}
            </select>
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
