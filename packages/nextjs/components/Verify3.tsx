import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";

export default function Verify3() {
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-l2 text-lg font-kan text-white rounded-dd animate-pulse">
          Your attestation is ready to be claimed!
        </div>
        <div className="bg-white p-10 rounded-dd grid gap-5">
          <div className="text-l1 text-3xl font-kan text-l2">Virtual Onboarding</div>
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
          <div className="homeBT mx-auto">Get Croissant</div>
        </div>
      </div>
    </div>
  );
}
