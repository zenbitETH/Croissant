import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlockieAvatar } from "@/components/scaffold-eth";
import { AppContextProvider } from "@/contexts/AppContextProvider";
import { useNativeCurrencyPrice } from "@/hooks/scaffold-eth";
import { useGlobalState } from "@/services/store/store";
import { wagmiConfig } from "@/services/web3/wagmiConfig";
import { appChains } from "@/services/web3/wagmiConnectors";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
  const apolloClient = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider
              chains={appChains.chains}
              avatar={BlockieAvatar}
              theme={isDarkTheme ? darkTheme() : lightTheme()}
            >
              <AppContextProvider>
                <>
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="relative">
                      <Component {...pageProps} />
                    </main>
                    <Footer />
                  </div>
                  <Toaster />
                </>
              </AppContextProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};

export default ScaffoldEthApp;
