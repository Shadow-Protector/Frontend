import { base, arbitrum, avalanche } from "wagmi/chains";

export const ConditionData = {
  [base.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink", avatar: "/chainlink.jpeg" },
      { id: 1, name: "Aave Overall Portfolio", avatar: "/aave.jpeg" },
      { id: 2, name: "Aave Collateral Position", avatar: "/aave.jpeg" },
      { id: 3, name: "Aave Debt Position", avatar: "/aave.jpeg" },
      { id: 4, name: "Morpho Vault Position", avatar: "/morpho.svg" },
    ],
    platformAddress: {
      // Chainlink Price Feeds
      ["0"]: [
        {
          id: 0,
          name: "Bitcoin USD Price Feed",
          value: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
          avatar: "/vercel.svg",
        },
        {
          id: 1,
          name: "ETH USD Price Feed",
          value: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
          avatar: "/vercel.svg",
        },
        {
          id: 2,
          name: "DAI USD Price Feed",
          value: "0xD1092a65338d049DB68D7Be6bD89d17a0929945e",
          avatar: "/vercel.svg",
        },
        {
          id: 3,
          name: "LINK USD Price Feed",
          value: "0xb113F5A928BCfF189C998ab20d753a47F9dE5A61",
          avatar: "/vercel.svg",
        },
      ],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [
        { id: 0, name: "Greater than current Price", avatar: "/vercel.svg" },
        {
          id: 1,
          name: "Lesser than or equal to current Price",
          avatar: "/vercel.svg",
        },
      ],
      ["1"]: [],
    },
  },
  [arbitrum.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink", avatar: "/chainlink.jpeg" },
      { id: 1, name: "Aave Overall Portfolio", avatar: "/aave.jpeg" },
      { id: 2, name: "Aave Collateral Position", avatar: "/aave.jpeg" },
      { id: 3, name: "Aave Debt Position", avatar: "/aave.jpeg" },
    ],
    platformAddress: {
      // Chainlink Price Feeds
      ["0"]: [],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [],
      ["1"]: [],
    },
  },
  [avalanche.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink", avatar: "/chainlink.jpeg" },
      { id: 1, name: "Aave Overall Portfolio", avatar: "/aave.jpeg" },
      { id: 2, name: "Aave Collateral Position", avatar: "/aave.jpeg" },
      { id: 3, name: "Aave Debt Position", avatar: "/aave.jpeg" },
    ],
    platformAddress: {
      // Chainlink Price Feeds
      ["0"]: [],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [],
      ["1"]: [],
    },
  },
  "-1": {
    platform: [{ id: 0, name: "Empty Platform", avatar: "/vercel.svg" }],
    platformAddress: {
      // Chainlink Price Feeds
      ["0"]: [],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [],
      ["1"]: [],
    },
  },
};

export const FinalSectionData = {
  [base.id.toString()]: {
    PlatformSelection: [
      {
        id: 0,
        name: "Self-Transfer",
        avatar: "/vercel.svg",
      },
      {
        id: 1,
        name: "Aave Protocol",
        avatar: "/aave.jpeg",
      },
      {
        id: 2,
        name: "Morpho Vaults",
        avatar: "/morpho.svg",
      },
      {
        id: 3,
        name: "Morpho Borrow Position",
        avatar: "/morpho.svg",
      },
    ],
  },
  [arbitrum.id.toString()]: {
    PlatformSelection: [
      {
        id: 0,
        name: "Self-Transfer",
        avatar: "/vercel.svg",
      },
      {
        id: 1,
        name: "Aave Protocol",
        avatar: "/aave.jpeg",
      },
    ],
  },
  [avalanche.id.toString()]: {
    PlatformSelection: [
      {
        id: 0,
        name: "Self-Transfer",
        avatar: "/vercel.svg",
      },
      {
        id: 1,
        name: "Aave Protocol",
        avatar: "/aave.jpeg",
      },
    ],
  },
};

export const ContractData = {
  [base.id.toString()]: {
    handler: "0x8803134877fb48bb1E4D404a91ceC43327aE45A1",
    factory: "0x1ECd0ef942ae53C35F4790BE9C4D3f546FD598D9",
    deployer: "0x16267fe0Cf31C8d4d2f650f5b29267a5536b1106",
  },
  [arbitrum.id.toString()]: {
    handler: "0x8803134877fb48bb1E4D404a91ceC43327aE45A1",
    factory: "0x1ECd0ef942ae53C35F4790BE9C4D3f546FD598D9",
    deployer: "0x16267fe0Cf31C8d4d2f650f5b29267a5536b1106",
  },
  [avalanche.id.toString()]: {
    handler: "0x8803134877fb48bb1E4D404a91ceC43327aE45A1",
    factory: "0x1ECd0ef942ae53C35F4790BE9C4D3f546FD598D9",
    deployer: "0x16267fe0Cf31C8d4d2f650f5b29267a5536b1106",
  },
};

export const chainConfiguration = [
  {
    id: "0",
    name: "Select Chain",
    avatar: "/vercel.svg",
  },
  {
    id: arbitrum.id.toString(),
    name: "Arbitrum",
    avatar: "/arbitrum.jpeg",
  },
  {
    id: avalanche.id.toString(),
    name: "Avalanche",
    avatar: "/Avalanche.jpeg",
  },
  {
    id: base.id.toString(),
    name: "Base",
    avatar: "/base.jpeg",
  },
];
