import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia, sepolia, avalancheFuji } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "62aa55fceb8beec7c28fda2fdd563420",
  chains: [baseSepolia, sepolia, avalancheFuji],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
