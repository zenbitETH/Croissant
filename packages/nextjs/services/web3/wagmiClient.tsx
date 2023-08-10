import { appChains, wagmiConnectors } from "@/services/web3/wagmiConnectors";
import { createClient } from "wagmi";

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: wagmiConnectors,
  provider: appChains.provider,
});
