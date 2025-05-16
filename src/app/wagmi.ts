import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, arbitrum, avalanche } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "62aa55fceb8beec7c28fda2fdd563420",
  chains: [base, arbitrum, avalanche],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
