import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="h-screen grid items-center ">
        <div className="h-fit grid grid-cols-2 text-center max-w-5xl mx-auto gap-5">
          <div className="bg-white/20 h-fit  rounded-xl ">
            <div className="text-4xl pt-20 pb-10 relative">
              Trust a contract
              <div className="absolute top-0 right-0 text-sm py-1 px-3 bg-blue-500 rounded-tr-xl rounded-bl-xl">
                Created:
                <span> 02/23/2023 </span>
                <div>in Sepholia</div>
              </div>
            </div>
            <div className="px-3 bg-black/50">
              <div>contract</div>
              <div>trusted</div>
              <div>txid</div>
            </div>
            <div className="grid grid-cols-6 bg-black/70 rounded-b-xl p-3 gap-3">
              <div className="col-span-2">expiration</div>
              <div className="col-span-2">revoked</div>
              <div className="col-span-2">revocable</div>
              <div className="col-span-3">no referenced attestation</div>
              <div className="col-span-3">no referencing </div>
            </div>
          </div>
          <div className="grid bg-white/20 p-5 rounded-xl gap-5">
            <div className="grid items-center">Cross-chain verification of this Attestation </div>
            <div className="mx-auto">
              <div className="bg-red-500 mx-auto rounded-xl py-1 px-3">Verify in Optimism</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
