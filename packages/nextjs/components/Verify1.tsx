import { ccipReceiverSepoliaAbi } from "@/abis/ccipReceiverSepolia";
import { useAppContext } from "@/contexts/AppContext";
import { parseUnits } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export default function Verify1() {
  const { workingQuizId } = useAppContext();

  const { config } = usePrepareContractWrite({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: ccipReceiverSepoliaAbi,
    functionName: "registerUserAnswers",
    args: [parseUnits(workingQuizId, 9), ""], // TODO: add the answers here, replace the "" as second parameter in args
    enabled: Boolean(workingQuizId),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log({ isLoading, isSuccess });

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
          <button className="homeBT mx-auto" disabled={!write || isLoading} onClick={() => write?.()}>
            Verify answers{isLoading ? "Verifying" : "Verify answers"}
          </button>
          {isSuccess && (
            <div>
              Successfully verified!
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
