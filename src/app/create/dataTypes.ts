import { ChangeEvent } from "react";

export type ConditionOrderDetails = {
  chainId: number;
  vaultAddress: string;
  platform: number;
  platformAddress: string;
  parameter: number;
  conditionValue: string;
  tipTokenAddress: string;
  tipTokenAmount: string;
};

export type ConditionProps = {
  conditionObject: ConditionOrderDetails;
  updateConditionObject: (
    key: keyof ConditionOrderDetails,
    value: string | number,
  ) => void;
};

export type TokenDataType = Partial<{
  name: string;
  symbol: string;
  thumbnail: string;
  token_address: string;
}>;

export type TipComponentProp = {
  conditionObject: ConditionOrderDetails;
  updateConditionObject: (
    key: keyof ConditionOrderDetails,
    value: string | number,
  ) => void;
  tokenData: TokenDataType[];
};

export type DepositOrderTokenDataProps = {
  depositObject: DepositOrderDetails;
  updateDepositObject: (
    key: keyof DepositOrderDetails,
    value: string | number,
  ) => void;
  tokenData: TokenDataType[];
};

export type ChainlinkFinalSectionProps = {
  conditionObject: ConditionOrderDetails;
  updateConditionObject: (
    key: keyof ConditionOrderDetails,
    value: string | number,
  ) => void;
  price: bigint;
};

export type ConditionFormProps = {
  conditionObject: ConditionOrderDetails;
  updateConditionObjectWithInput: (e: ChangeEvent<HTMLInputElement>) => void;
  updateConditionObjectWithSelector: (
    e: ChangeEvent<HTMLSelectElement>,
  ) => void;
};

export type ConditionFormInputProps = {
  conditionObject: ConditionOrderDetails;
  updateConditionObjectWithInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ConditionFormSelectorProps = {
  conditionObject: ConditionOrderDetails;
  updateConditionObjectWithSelector: (
    e: ChangeEvent<HTMLSelectElement>,
  ) => void;
};

export type DepositOrderDetails = {
  chainId: number;
  vaultAddress: string;
  depositTokenAddress: string;
  depositTokenType: number;
  convertTokenAddress: string;
  tokenAmount: string;
  depositPlatform: number;
  depositPlatformAddress: string;
  repay: number;
};

export type DepositOrderProps = {
  depositObject: DepositOrderDetails;
  updateDepositObject: (
    key: keyof DepositOrderDetails,
    value: string | number,
  ) => void;
};

export type FinalSectionProps = {
  chainId: number;
  depositObject: DepositOrderDetails;
  updateDepositObject: (
    key: keyof DepositOrderDetails,
    value: string | number,
  ) => void;
};
