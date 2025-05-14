import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";
import { DepositFormProps } from "../../dataTypes";

export function DepositSection({
  depositObject,
  updateDepositObjectWithInput,
  updateDepositObjectWithSelector,
}: DepositFormProps) {
  return (
    <>
      <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
        <div className="columns-1">
          <h4 className="text-gray-500 dark:text-neutral-400">Deposit Asset</h4>
          Select Chain: {depositObject.chainId}
          <select
            name="chainId"
            className="py-5 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onChange={updateDepositObjectWithSelector}
          >
            <option value={0}>Select Chain</option>
            <option value={baseSepolia.id}>Base</option>
            <option value={sepolia.id}>Arbitrum</option>
            <option value={avalancheFuji.id}>Avalanche</option>
          </select>
        </div>
      </div>
    </>
  );
}
