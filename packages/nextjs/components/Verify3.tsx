import Image from "next/image";
import logo from "../public/logo.svg";

export default function Verify3() {
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-bt text-lg font-kan text-l1 rounded-dd animate-pulse">
          Your attestation is ready to be claimed!
        </div>
        <div className="bg-bt p-10 rounded-dd grid gap-5">
          <div className="text-l1 text-3xl font-kan text-l2">Virtual Onboarding</div>
          <div className="mx-auto">
            <Image src={logo} alt="Croissant Attestation" />
          </div>
          <div className="text-2xl text-l1 font-kan bg-bt rounded-dd p-3 text-left">
            <div className="text-l2">Schema ID in Optimism</div>
            <div>Schema ID in Base</div>
          </div>
          <div className="homeBT">Get Croissant</div>
        </div>
      </div>
    </div>
  );
}
