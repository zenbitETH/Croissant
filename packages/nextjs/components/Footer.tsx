import { SwitchTheme } from "@/components/SwitchTheme";

//import { Faucet } from "@/components/scaffold-eth";
//import { useGlobalState } from "@/services/store/store";
//import { getTargetNetwork } from "@/utils/scaffold-eth";
//import { hardhat } from "wagmi/chains";
//import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
//import { HeartIcon } from "@heroicons/react/24/outline";

/**
 * Site footer
  <div className="flex space-x-2 pointer-events-auto">
    {nativeCurrencyPrice > 0 && (
      <div className="btn btn-primary btn-sm font-normal cursor-auto">
        <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
        <span>{nativeCurrencyPrice}</span>
      </div>
    )}
    {getTargetNetwork().id === hardhat.id && <Faucet />}
  </div>
 */
export const Footer = () => {
  // const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  return (
    <div className="fixed bottom-5 right-5">
      <SwitchTheme className="pointer-events-auto" />
    </div>
  );
};
