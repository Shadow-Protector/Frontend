import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";

export const ConditionData = {
  [baseSepolia.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink" },
      { id: 1, name: "Aave Overall Portfolio" },
      { id: 2, name: "Aave Collateral Position" },
      { id: 3, name: "Aave Debt Position" },
      { id: 4, name: "Morpho Vault Position" },
    ],
    platformAddress: {
      // Chainlink Price Feeds
      "0": [
        {
          id: 0,
          name: "Bitcoin USD Price Feed",
          value: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
        },
        {
          id: 1,
          name: "ETH USD Price Feed",
          value: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
        },
        {
          id: 2,
          name: "DAI USD Price Feed",
          value: "0xD1092a65338d049DB68D7Be6bD89d17a0929945e",
        },
        {
          id: 3,
          name: "LINK USD Price Feed",
          value: "0xb113F5A928BCfF189C998ab20d753a47F9dE5A61",
        },
      ],
    },
    parameterType: {
      0: [
        { id: 0, name: "Greater than current Price" },
        { id: 1, name: "Lesser than or equal to current Price" },
      ],
    },
  },
  [sepolia.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink" },
      { id: 1, name: "Aave Overall Portfolio" },
      { id: 2, name: "Aave Collateral Position" },
      { id: 3, name: "Aave Debt Position" },
    ],
  },
  [avalancheFuji.id.toString()]: {
    platform: [
      { id: 0, name: "Chainlink" },
      { id: 1, name: "Aave Overall Portfolio" },
      { id: 2, name: "Aave Collateral Position" },
      { id: 3, name: "Aave Debt Position" },
    ],
  },
};

export const FinalSectionData = {
  [baseSepolia.id.toString()]: {
    PlatformSelection: [
      {
        id: 0,
        name: "Self-Transfer",
      },
      {
        id: 1,
        name: "Aave Protocol",
      },
      {
        id: 2,
        name: "Morpho Vaults",
      },
      {
        id: 3,
        name: "Morpho Borrow Position",
      },
    ],
  },
};

export const ContractData = {
  [baseSepolia.id.toString()]: {
    handler: "0x297dC29284778d3FbB33ef14076aF8927bAB5222",
    factory: "0xDD51Ac91a5a4D78a83295b1c61288a05c6ebb937",
    deployer: "0x4CcFd0F469E27110b30C0FDAc35Dd32cd57F131D",
  },
};

export const chainConfiguration = [
  {
    id: "-1",
    name: "Select Chain",
    avatar: "/vercel.svg",
  },
  {
    id: sepolia.id.toString(),
    name: "Arbitrum",
    avatar: "/arbitrum.jpeg",
  },
  {
    id: avalancheFuji.id.toString(),
    name: "Avalanche",
    avatar: "/Avalanche.jpeg",
  },
  {
    id: baseSepolia.id.toString(),
    name: "Base",
    avatar: "/base.jpeg",
  },
];
