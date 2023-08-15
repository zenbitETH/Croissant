import { ccipSenderOptimismAbi } from "@/abis/ccipSenderOptimism";
import { useAppContext } from "@/contexts/AppContext";
import { parseUnits } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export default function Quiz() {
  const { workingQuizId } = useAppContext();

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipSenderOptimismAbi,
    functionName: "registerUserAnswers",
    args: [parseUnits(workingQuizId, 9), "312"], // TODO: add the answers here, replace the "" as second parameter in args
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
          <div className="font-kan text-4xl text-black ">Tool used to interact with Daps and smart contracts:</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Hammer</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">E-mail</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Wallet</div>
            </span>
          </div>
        </div>
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black ">Your wallet has two keys, which one is safe to share?</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Public Key</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Telephone number</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Personal data</div>
            </span>
          </div>
        </div>
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black ">You should REALLY keep this secret and private:</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">My eyeballs</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Private key</div>
            </span>
            <span className="flex itemx-center">
              <input type="checkbox" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Best memes</div>
            </span>
          </div>
        </div>
        <button className="homeBT mx-auto" disabled={!write || isLoading} onClick={() => write?.()}>
          {isLoading ? "Verifying" : "Verify answers"}
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
  );
}
