import { appChains, wagmiConnectors } from "@/services/web3/wagmiConnectors";
import { createConfig } from "wagmi";

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: wagmiConnectors,
  publicClient: appChains.publicClient,
});
