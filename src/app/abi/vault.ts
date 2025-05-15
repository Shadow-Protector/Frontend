export const vaultABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_factoryContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_hyperlaneMailbox",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "addExternalChainVault",
    inputs: [
      {
        name: "chainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "chainAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelAssetDeposit",
    inputs: [
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
    name: "cancelOrder",
    inputs: [
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
    name: "createOrder",
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
        name: "tipToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "tipAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "decodeKey",
    inputs: [
      {
        name: "orderId",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "platform",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "salt",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "depositAsset",
    inputs: [
      {
        name: "_orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_assetType",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_convert",
        type: "address",
        internalType: "address",
      },
      {
        name: "_tokenAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_platform",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_repay",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "executeOrder",
    inputs: [
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
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "generateKey",
    inputs: [
      {
        name: "platform",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "conditionAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "parameter",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "destinationChainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "salt",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getExternalChainVault",
    inputs: [
      {
        name: "chainId",
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
    name: "getOrderExecutionDetails",
    inputs: [
      {
        name: "orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "order",
        type: "tuple",
        internalType: "struct OrderExecutionDetails",
        components: [
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "convert",
            type: "address",
            internalType: "address",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "assetType",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "platform",
            type: "uint16",
            internalType: "uint16",
          },
          {
            name: "repay",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handle",
    inputs: [
      {
        name: "_origin",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_sender",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_message",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
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
    name: "withdrawNativeToken",
    inputs: [
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
    type: "error",
    name: "ConditionEvaluationFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "ConditionValueIsZero",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCrossChainSender",
    inputs: [
      {
        name: "sender",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidOrderId",
    inputs: [
      {
        name: "orderId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "NotHandler",
    inputs: [
      {
        name: "handler",
        type: "address",
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
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
  {
    type: "error",
    name: "SenderNotMailbox",
    inputs: [
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "TipAmountIsZero",
    inputs: [],
  },
] as const;
