import { useState } from "react";
import { ccipSenderOptimismAbi } from "@/abis/ccipSenderOptimism";
import { useContractRead } from "wagmi";

export default function Verify1() {
  const [verifyNow, setVerifyNow] = useState(false);
  // validate user quiz result in https://goerli-optimism.etherscan.io/address/0xd2D9De2c40D1A49f7247165284cea27a1BEAa272#readContract addressToUser function

  const { data: addressToUserData /*, isError: quizIdIsError */ } = useContractRead({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipSenderOptimismAbi,
    functionName: "addressToUser",
    watch: false,
    args: ["address to validate from the Quiz step result (The attest)"],
    enabled: Boolean(verifyNow),
  });

  console.log({ addressToUserData });

  // after pressing the button and save the result
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black pb-20 grid gap-14">
            <div className="animate-pulse"> Verify your answers:</div>
            <div>
              <div className="font-kan text-2xl text-l1 pb-3">
                1. Tool used to interact with Daps and smart contracts:
              </div>
              <div className="grid items-center pl-3 font-kum text-5xl  text-l2 animate-pulse">Wallet</div>
            </div>
            <div>
              <div className="font-kan text-2xl text-l1 pb-3">
                2. Your wallet has two keys, which one is safe to share?
              </div>
              <div className="grid items-center pl-3 font-kum text-5xl  text-l2 animate-pulse">Public keys</div>
            </div>
            <div>
              <div className="font-kan text-2xl text-l1 pb-3">3. You should REALLY keep this secret and private:</div>
              <div className="grid items-center pl-3 font-kum text-5xl  text-l2 animate-pulse">Private Keys</div>
            </div>
          </div>
          <button className="homeBT mx-auto" disabled={!verifyNow} onClick={() => setVerifyNow(true)}>
            {/* Verify answers{isLoading ? "Verifying" : "Verify answers"} */}
            Verify
          </button>
          {/* {isSuccess && <div>Successfully verified!</div>} */}
        </div>
      </div>
    </div>
  );
}
