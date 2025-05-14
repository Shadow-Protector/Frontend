import { useAccount, useDisconnect } from "wagmi";
// import { useCapabilities } from "wagmi";
// import { switchChain } from "@wagmi/core";
// import { sepolia } from "@wagmi/core/chains";
// import { config } from "@/app/wagmi";
// import { useEffect } from "react";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  // const { data: capabilities } = useCapabilities();

  // useEffect(() => {
  //   const switchToSepolia = async () => {
  //     await switchChain(config, { chainId: sepolia.id });
  //   };
  //   switchToSepolia();
  // }, []);

  // if (capabilities) {
  //   console.log(capabilities);
  // }

  return (
    <>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        onClick={() => disconnect()}
      >
        {`Disconnect  ${address?.slice(0, 6)}...${address?.slice(-4)}`}
      </button>
    </>
  );
}
