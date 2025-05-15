export const factoryABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_handler",
        type: "address",
        internalType: "address",
      },
      {
        name: "_platformFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addVault",
    inputs: [
      {
        name: "_vault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkCondition",
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
    name: "emitCancelDeposit",
    inputs: [
      {
        name: "_vaultOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitCancelOrder",
    inputs: [
      {
        name: "_vaultOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "OrderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitDepositEvent",
    inputs: [
      {
        name: "_vaultOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitExecuteOrder",
    inputs: [
      {
        name: "_vaultOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "OrderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitOrderCreation",
    inputs: [
      {
        name: "_platform",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "_platformAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_salt",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitOrderCreation",
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
        name: "_parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_salt",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "conditionValue",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_vaultOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "executeCrossChainOrder",
    inputs: [
      {
        name: "vaultOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "orderId",
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
    name: "getHandler",
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
    name: "getVault",
    inputs: [
      {
        name: "_owner",
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
    name: "handler",
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
    name: "platformFee",
    inputs: [],
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
    name: "updateHandler",
    inputs: [
      {
        name: "_newHandler",
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
    name: "updatePlatformFee",
    inputs: [
      {
        name: "_newPlatformFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateVaultDeployer",
    inputs: [
      {
        name: "_newVaultDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vaultDeployer",
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
    name: "AssetDeposited",
    inputs: [
      {
        name: "vaultAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "orderId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CancelDeposit",
    inputs: [
      {
        name: "vaultAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "orderId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCancelled",
    inputs: [
      {
        name: "vaultAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "orderId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderCreated",
    inputs: [
      {
        name: "_platform",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "_platformAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_parameter",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "_salt",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "conditionValue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vault",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderExecuted",
    inputs: [
      {
        name: "vaultAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "orderId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatedHandler",
    inputs: [
      {
        name: "newConditionEvaluator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldConditionEvaluator",
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
    type: "event",
    name: "VaultCreated",
    inputs: [
      {
        name: "vaultAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "NotOwner",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;
