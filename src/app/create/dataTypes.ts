import { ChangeEvent } from "react";

export type ConditionOrderDetails = {
  chainId: number;
  platform: number;
  platformAddress: string;
  parameter: number;
  conditionValue: string;
  tipTokenAddress: string;
  tipTokenAmount: string;
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
  depositTokenAddress: string;
  depositTokenType: number;
  convertTokenAddress: string;
  tokenAmount: string;
  depositPlatform: number;
  repay: number;
};

export type DepositFormProps = {
  depositObject: DepositOrderDetails;
  updateDepositObjectWithInput: (e: ChangeEvent<HTMLInputElement>) => void;
  updateDepositObjectWithSelector: (e: ChangeEvent<HTMLSelectElement>) => void;
};
