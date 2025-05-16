import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { useSwitchChain, useAccount } from "wagmi";
import { getVaultAddress, deployVault } from "../utils";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ConditionProps,
  TipComponentProp,
  TokenDataType,
} from "../../dataTypes";
import { ConditionData, chainConfiguration } from "../../data";

import { ChainlinkSection } from "./ChainlinkSection";
import { AavePortfolioSection } from "./AavePortfolioSection";
import { AaveCollateralSection } from "./AaveCollateralSection";
import { AaveDebtSection } from "./AaveDebtSection";
import { MorphoVaultSection } from "./MorphoVaultSection";

export function ConditionSection({
  conditionObject,
  updateConditionObject,
}: ConditionProps) {
  const [selected, setSelected] = useState(chainConfiguration[0]);
  const [tokenData, setTokenData] = useState([{}]);
  const { switchChain } = useSwitchChain();
  const { address } = useAccount();

  async function updateChainId(chain: {
    id: string;
    name: string;
    avatar: string;
  }) {
    console.log(chain);
    switchChain({ chainId: Number(chain.id) });

    if (address) {
      let vaultAddress = await getVaultAddress(chain.id, address);
      console.log("User Vault", vaultAddress);
      if (vaultAddress == "0x0000000000000000000000000000000000000000") {
        console.log("Need to deploy vault");
        await deployVault(chain.id);

        vaultAddress = await getVaultAddress(chain.id, address);
        console.log("New User Vault", vaultAddress);
      }
      setSelected(chain);
      if (vaultAddress) {
        updateConditionObject("chainId", chain.id);
        updateConditionObject("vaultAddress", vaultAddress);
      }

      const params = new URLSearchParams();
      params.append("chain", address);
      params.append("address", chain.id);

      // Calling Tokens Endpoint
      fetch(`/api/moralis?${params}`)
        .then((res) => res.json())
        .then((data) => setTokenData(data));
    }
  }

  return (
    <>
      <div className="p-4 h-max bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl dark:bg-neutral-700 dark:border-neutral-600">
        <div className="columns-1">
          <h4 className="text-gray-500 dark:text-neutral-400">
            Create Order Condition
          </h4>
          <div>
            <Listbox value={selected} onChange={updateChainId}>
              <Label className="block text-sm/6 font-medium text-gray-900">
                Chain Selected: {selected.name}-{conditionObject.chainId}
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
                  {chainConfiguration.map((chain) => (
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
          </div>
          <ConditionPlatform
            conditionObject={conditionObject}
            updateConditionObject={updateConditionObject}
          />
          <ConditionPlatformAddress
            conditionObject={conditionObject}
            updateConditionObject={updateConditionObject}
          />
          {/* <ConditionParamterType
            conditionObject={conditionObject}
            updateConditionObject={updateConditionObject}
          /> */}
          <br />
          <TipComponent
            conditionObject={conditionObject}
            updateConditionObject={updateConditionObject}
            tokenData={tokenData}
          />
        </div>
      </div>
    </>
  );
}

function ConditionPlatform({
  conditionObject,
  updateConditionObject,
}: ConditionProps) {
  const [selected, setSelected] = useState({
    id: 0,
    name: "Select Platform",
    avatar: "/vercel.svg",
  });

  async function updateConditionPlatform(platform: {
    id: number;
    name: string;
    avatar: string;
  }) {
    console.log(platform);

    updateConditionObject("platform", platform.id);
    setSelected(platform);
  }

  if (conditionObject.chainId != 0) {
    const array = ConditionData[conditionObject.chainId.toString()].platform;
    if (array == undefined) {
      return;
    }
    return (
      <>
        <br />
        <Listbox value={selected} onChange={updateConditionPlatform}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Condition Platform: {selected.name}-
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
      </>
    );
  }
  return;
}

function ConditionPlatformAddress({
  conditionObject,
  updateConditionObject,
}: ConditionProps) {
  // Chainlink (0)
  // Aave Overall Portfolio (1)
  // Aave Collateral Position (2)
  // Aave Debt Position (3)
  // Morpho Vault Position (4)

  // Chainlink
  if (conditionObject.platform == 0) {
    return (
      <ChainlinkSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
      />
    );
  } else if (conditionObject.platform == 1) {
    return (
      <AavePortfolioSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
      />
    );
  } else if (conditionObject.platform == 2) {
    return (
      <AaveCollateralSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
      />
    );
  } else if (conditionObject.platform == 3) {
    return (
      <AaveDebtSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
      />
    );
  } else if (conditionObject.platform == 4) {
    return (
      <MorphoVaultSection
        conditionObject={conditionObject}
        updateConditionObject={updateConditionObject}
      />
    );
  }

  // async function updateConditionPlatformAddress(
  //   e: ChangeEvent<HTMLSelectElement>,
  // ) {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   updateConditionObject("platformAddress", value);
  // }

  // console.log("Condition Platform", conditionObject.platform);
  // if (conditionObject.platform >= 0) {
  //   const array =
  //     ConditionData[conditionObject.chainId.toString()].platformAddress[
  //       conditionObject.platform.toString()
  //     ];

  //   if (array == undefined) {
  //     return;
  //   }

  //   const listItem = array.map((object) => (
  //     <option key={object.id} value={object.value}>
  //       {object.name}
  //     </option>
  //   ));
  //   // console.log("Address Call", listItem);

  //   return (
  //     <>
  //       Select Condition Platform Address:
  //       {`${conditionObject.platformAddress?.slice(0, 4)}..${conditionObject.platformAddress?.slice(-4)}`}
  //       <select
  //         name="platformAddress"
  //         className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  //         onChange={updateConditionPlatformAddress}
  //       >
  //         <option>Select Platform</option>
  //         {listItem}
  //       </select>
  //       <br />
  //     </>
  //   );
  // }

  return;
}

// function ConditionParamterType({
//   conditionObject,
//   updateConditionObject,
// }: ConditionProps) {
//   async function updateConditionParameter(e: ChangeEvent<HTMLSelectElement>) {
//     const { name, value } = e.target;
//     console.log(name, value);

//     updateConditionObject("parameter", value);
//   }

//   async function updateConditionValue(e: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     console.log(name, value);

//     updateConditionObject("conditionValue", value);
//   }

//   if (conditionObject.platform >= 0 && conditionObject.platformAddress != "") {
//     console.log(
//       "",
//       ConditionData[conditionObject.chainId].parameterType[
//         conditionObject.platform
//       ],
//     );

//     const array =
//       ConditionData[conditionObject.chainId].parameterType[
//         conditionObject.platform
//       ];

//     if (array == undefined) {
//       return;
//     }

//     const listItem = array.map((object: { id: number; name: string }) => (
//       <option key={object.id} value={object.id}>
//         {object.name}
//       </option>
//     ));

//     return (
//       <>
//         Select Condition:
//         {conditionObject.parameter >= 0 ? conditionObject.parameter : ""}
//         <select
//           name="parameter"
//           className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//           onChange={updateConditionParameter}
//         >
//           <option value={-1}>Select Condition</option>
//           {listItem}
//         </select>
//         <br />
//         <div className="max-w-sm space-y-3">
//           <div>
//             <label
//               htmlFor="conditionValue"
//               className="block text-sm font-medium mb-2 dark:text-white"
//             >
//               Enter Value: {conditionObject.conditionValue}
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="hs-input-with-leading-and-trailing-icon"
//                 name="conditionValue"
//                 className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
//                 placeholder="0.00"
//                 onChange={updateConditionValue}
//               />
//               <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
//                 <span className="text-gray-500 dark:text-neutral-500">$</span>
//               </div>
//               <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
//                 <span className="text-gray-500 dark:text-neutral-500">USD</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
//   return;
// }

function TipComponent({
  conditionObject,
  updateConditionObject,
  tokenData,
}: TipComponentProp) {
  const [selected, setSelected] = useState({
    name: "Select Tip Token",
    symbol: "STP",
    thumbnail: "/coin.png",
    token_address: "0x",
  });

  async function updateTipTokenAddress(token: TokenDataType) {
    console.log(token);
    updateConditionObject(
      "tipTokenAddress",
      token.token_address ? token.token_address : "0x",
    );
    setSelected({
      name: token.name ? token.name : "",
      symbol: token.symbol ? token.symbol : "",
      thumbnail: token.thumbnail ? token.thumbnail : "/coin.png",
      token_address: token.token_address ? token.token_address : "0x",
    });
  }

  async function updateTipTokenAmount(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);

    updateConditionObject("tipTokenAmount", value);
  }

  if (Object.keys(tokenData[0]).length !== 0) {
    return (
      <>
        <Listbox value={selected} onChange={updateTipTokenAddress}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Tip Token
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <Image
                  width={400}
                  height={400}
                  alt=""
                  src={selected.thumbnail}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="block truncate">
                  {selected.name}({selected.symbol})
                </span>
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
              {tokenData.map((token) => (
                <ListboxOption
                  key={token.name}
                  value={token}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <Image
                      width={400}
                      height={400}
                      alt=""
                      src={token.thumbnail ? token.thumbnail : "/coin.png"}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                      {token.name}({token.symbol})
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
              htmlFor="tipTokenAmount"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Enter Value: {conditionObject.tipTokenAmount}
            </label>
            <div className="relative">
              <input
                type="number"
                id="hs-input-with-leading-and-trailing-icon"
                name="tipTokenAmount"
                className="py-2.5 sm:py-3 px-4 ps-9 pe-16 block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="0.00"
                onChange={updateTipTokenAmount}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
