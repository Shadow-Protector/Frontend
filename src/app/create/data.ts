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
          name: "Aave USD Price Feed",
          value: "0x3d6774EF702A10b20FCa8Ed40FC022f7E4938e07",
          avatar: "/aave.jpeg",
        },
        {
          id: 1,
          name: "AERO USD Price Feed",
          value: "0x4EC5970fC728C5f65ba413992CD5fF6FD70fcfF0",
          avatar: "/aerodrome.png",
        },
        {
          id: 2,
          name: "AVAX USD Price Feed",
          value: "0xE70f2D34Fd04046aaEC26a198A35dD8F2dF5cd92",
          avatar: "/avalanche.jpeg",
        },
        {
          id: 3,
          name: "BTC USD Price Feed",
          value: "0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F",
          avatar: "/bitcoin.png",
        },
        {
          id: 4,
          name: "CBETH ETH Price Feed",
          value: "0x806b4Ac04501c29769051e42783cF04dCE41440b",
          avatar: "/cbeth.png",
        },
        {
          id: 5,
          name: "CBETH USD Price Feed",
          value: "0xd7818272B9e248357d13057AAb0B417aF31E817d",
          avatar: "/cbeth.png",
        },
        {
          id: 6,
          name: "LINK USD Price Feed",
          value: "0x17CAb8FE31E32f08326e5E27412894e49B0f9D65",
          avatar: "/chainlink.jpeg",
        },
        {
          id: 7,
          name: "MORPHO USD Price Feed",
          value: "0xe95e258bb6615d47515Fc849f8542dA651f12bF6",
          avatar: "/morpho.svg",
        },
      ],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [
        {
          id: 0,
          name: "Greater than current value",
          avatar: "/greater-than.png",
        },
        {
          id: 1,
          name: "Lesser than or equal to current value",
          avatar: "/less-than.png",
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
      ["0"]: [
        {
          id: 0,
          name: "Aave USD Price Feed",
          value: "0xaD1d5344AaDE45F43E596773Bcc4c423EAbdD034",
          avatar: "/aave.jpeg",
        },
        {
          id: 1,
          name: "AVAX USD Price Feed",
          value: "0x8bf61728eeDCE2F32c456454d87B5d6eD6150208",
          avatar: "/avalanche.jpeg",
        },
        {
          id: 2,
          name: "BTC USD Price Feed",
          value: "0x6ce185860a4963106506C203335A2910413708e9",
          avatar: "/bitcoin.png",
        },
        {
          id: 3,
          name: "CBETH ETH Price Feed",
          value: "0xa668682974E3f121185a3cD94f00322beC674275",
          avatar: "/bitcoin.png",
        },
        {
          id: 4,
          name: "LINK USD Price Feed",
          value: "0x86E53CF1B870786351Da77A57575e79CB55812CB",
          avatar: "/chainlink.jpeg",
        },
      ],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [
        {
          id: 0,
          name: "Greater than current value",
          avatar: "/greater-than.png",
        },
        {
          id: 1,
          name: "Lesser than or equal to current value",
          avatar: "/less-than.png",
        },
      ],
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
      ["0"]: [
        {
          id: 0,
          name: "Aave USD Price Feed",
          value: "0x3CA13391E9fb38a75330fb28f8cc2eB3D9ceceED",
          avatar: "/aave.jpeg",
        },
        {
          id: 1,
          name: "AVAX USD Price Feed",
          value: "0x0A77230d17318075983913bC2145DB16C7366156",
          avatar: "/avalanche.jpeg",
        },
        {
          id: 2,
          name: "BTC USD Price Feed",
          value: "0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743",
          avatar: "/bitcoin.png",
        },
        {
          id: 3,
          name: "ETH USD Price Feed",
          value: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
          avatar: "/bitcoin.png",
        },
        {
          id: 4,
          name: "LINK USD Price Feed",
          value: "0x49ccd9ca821EfEab2b98c60dC60F518E765EDe9a",
          avatar: "/chainlink.jpeg",
        },
      ],
      ["1"]: [],
    },
    parameterType: {
      ["0"]: [
        {
          id: 0,
          name: "Greater than current value",
          avatar: "/greater-than.png",
        },
        {
          id: 1,
          name: "Lesser than or equal to current value",
          avatar: "/less-than.png",
        },
      ],
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
    handler: "0xdE8bb0fbcA6deE981c607C54f94bdd34A9D15362",
    factory: "0xEc9A1021cC0d4619ac6405a648239bEB0bFCf76C",
    deployer: "0xbF7d635B1F6fed745d9414a414F1f8B372C0bd79",
    aavePool: "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",
  },
  [arbitrum.id.toString()]: {
    handler: "0x8803134877fb48bb1E4D404a91ceC43327aE45A1",
    factory: "0x1ECd0ef942ae53C35F4790BE9C4D3f546FD598D9",
    deployer: "0x16267fe0Cf31C8d4d2f650f5b29267a5536b1106",
    aavePool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  },
  [avalanche.id.toString()]: {
    handler: "0x8803134877fb48bb1E4D404a91ceC43327aE45A1",
    factory: "0x1ECd0ef942ae53C35F4790BE9C4D3f546FD598D9",
    deployer: "0x16267fe0Cf31C8d4d2f650f5b29267a5536b1106",
    aavePool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
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

export const AavePortfolioParameters = [
  {
    id: -1,
    name: "Select Parameter Condition",
    avatar: "/vercel.svg",
  },
  {
    id: 0,
    name: "Total Collateral Value",
    avatar: "/vercel.svg",
  },
  {
    id: 2,
    name: "Total Debt Value",
    avatar: "/vercel.svg",
  },
  {
    id: 4,
    name: "Health Factor",
    avatar: "/vercel.svg",
  },
];
