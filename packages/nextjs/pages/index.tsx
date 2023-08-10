import Image from "next/image";
import logo from "../public/logo.svg";
import { MetaHeader } from "@/components/MetaHeader";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="m-auto">
      <MetaHeader />
      <div className="bg-bt/60 w-screen grid xl:grid-cols-2 text-center py-5">
        <div className="mx-auto grid xl:flex items-center text-l1 text-6xl xl:text-8xl font-kum font-bold gap-5 pb-5 xl:pb-0 px-10">
          <Image src={logo} alt="Croissant Logo" className="mx-auto" />
          <div>Croissant</div>
        </div>
        <div className="font-kan text-l1/70 text-xl xl:text-5xl grid items-center px-24">
          Crosschain Attestations for web3 onboarding
        </div>
      </div>
    </div>
  );
};

export default Home;
