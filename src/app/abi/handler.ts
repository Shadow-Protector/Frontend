export const handlerABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_aavePool",
        type: "address",
        internalType: "address",
      },
      {
        name: "_aavePriceGetter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_morphoPool",
        type: "address",
        internalType: "address",
      },
      {
        name: "_aerodromeRouter",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "aavePool",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAavePool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "aavePriceGetter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPriceOracleGetter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addCrossChainHandler",
    inputs: [
      {
        name: "_chainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_handler",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addMorphoMarket",
    inputs: [
      {
        name: "_market",
        type: "address",
        internalType: "address",
      },
      {
        name: "_id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addMorphoVault",
    inputs: [
      {
        name: "_vault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vaultId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "aerodromeRouter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IRouter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkAaveCollateralCondition",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkAaveDebtCondition",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkAavePortfioCondition",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkChainlinkCondition",
    inputs: [
      {
        name: "_V3InterfaceAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkMorphoCondition",
    inputs: [
      {
        name: "_market",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "convertToDepositAddress",
    inputs: [
      {
        name: "input",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "crossChainHandlers",
    inputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eulerDepositVaults",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eulerPool",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "evaluateCondition",
    inputs: [
      {
        name: "_platform",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_platformAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeCrossChainOrder",
    inputs: [
      {
        name: "vault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeOrder",
    inputs: [
      {
        name: "vault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_solver",
        type: "address",
        internalType: "address",
      },
      {
        name: "route",
        type: "tuple[]",
        internalType: "struct IRouter.Route[]",
        components: [
          {
            name: "from",
            type: "address",
            internalType: "address",
          },
          {
            name: "to",
            type: "address",
            internalType: "address",
          },
          {
            name: "stable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "factory",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAaveCollateralData",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAaveDebtData",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAavePortfolioData",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getChainlinkData",
    inputs: [
      {
        name: "_V3InterfaceAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDepositToken",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "assetType",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morphoMarket",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morphoPool",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IMorpho",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morphoVaults",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rescueFunds",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateFactory",
    inputs: [
      {
        name: "_factory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateOwner",
    inputs: [
      {
        name: "_newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateUsdc",
    inputs: [
      {
        name: "_usdc",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "usdc",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "MorphoMarketAdded",
    inputs: [
      {
        name: "market",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "id",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MorphoVaultAdded",
    inputs: [
      {
        name: "vault",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "vaultId",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedOwner",
    inputs: [
      {
        name: "oldOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "InvalidEndToken",
    inputs: [
      {
        name: "requiredToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "endToken",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidRoute",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidStartToken",
    inputs: [
      {
        name: "requiredToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "startToken",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;
