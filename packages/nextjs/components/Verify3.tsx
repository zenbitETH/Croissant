import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
// import { ccipReceiverSepoliaAbi } from "@/abis/ccipReceiverSepolia"; // TODO
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export default function Verify3() {
  const { config } = usePrepareContractWrite({
    address: "0xcontract", // TODO
    // abi: ccipReceiverSepoliaAbi, // TODO
    // functionName: "getCroissant", // TODO
    enabled: Boolean(false), // TODO
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log({ isLoading, isSuccess });

  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-l2 text-lg font-kan text-white rounded-dd animate-pulse">
          Your attestation is ready to be claimed!
        </div>
        <div className="bg-white p-10 rounded-dd grid gap-5">
          <div className="text-l1 text-3xl font-kan">Virtual Onboarding</div>
          <div className="mx-auto">
            <Image src={logo} alt="Croissant Attestation" />
          </div>
          <div className="text-2xl text-l1 font-kan bg-bth rounded-dd p-3  cursor-pointer">
            <Link href="https://optimism-goerli-bedrock.easscan.org/schema/view/0x0d6ecbd5000b1713c21e28296f6ed8bfa8e0e5f5d8ee4b354276ba65c8b2c188">
              <div className="text-l2">Schema ID in Optimism</div>
              <div>Schema ID in Sepolia</div>
            </Link>
            <Link href="https://ccip.chain.link/msg/0x9be2f2e094403fa1527e72cfaf651a1b3757890fb0bd0bdea3258ef7d7452ff3">
              <div className="text-white">Chainlink CCID</div>
            </Link>
          </div>
          <button disabled={!write || isLoading} onClick={() => write?.()} className="homeBT mx-auto">
            {isLoading ? "Enjoy your Croissant!" : "Get Croissant"}
          </button>
          {isSuccess && (
            <div>
              Successfully adquired your Croissant!
              {/* <div>
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
