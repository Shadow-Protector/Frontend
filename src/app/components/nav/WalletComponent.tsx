"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Account } from "./Account";

export function WalletConnectionComponent() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <ConnectButton />;
}
