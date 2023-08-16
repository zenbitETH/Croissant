import { ccipSenderOptimismAbi } from "@/abis/ccipSenderOptimism";
import Input from "@/components/ui/Input";
import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { parseUnits } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export default function Quiz() {
  const { workingQuizId } = useAppContext();

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipSenderOptimismAbi,
    functionName: "registerUserAnswers",
    args: [parseUnits("1", 9), "312"], // TODO: add the answers here, replace the "" as second parameter in args
    enabled: Boolean(workingQuizId),
  });

  const { data, write } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
    data: data2,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log({ data, isLoading, isSuccess, data2 });

  const { register, handleSubmit, watch, formState } = useForm();
  console.log("isValid", formState.isValid);
  console.log("values", watch());

  const onSubmit = (data: any) => {
    console.log(data);

    if (data) {
      write?.();
    }
  };

  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-bt/50 p-10 rounded-dd">
            <div className="font-kan text-4xl text-black ">Tool used to interact with Daps and smart contracts:</div>
            <div className="grid grid-cols-3 pt-10 gap-5 ">
              <span className="flex itemx-center">
                <Input type="checkbox" className="radio" value="1" {...register("answer-0")} />
                {/* <input type="checkbox" className="radio" value="1" {...register("answer-1")} /> */}
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Hammer</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" className="radio" value="2" {...register("answer-1")} />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">E-mail</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" className="radio" value="3" {...register("answer-1")} />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Wallet</div>
              </span>
            </div>
          </div>
          <div className="bg-bt/50 p-10 rounded-dd">
            <div className="font-kan text-4xl text-black ">Your wallet has two keys, which one is safe to share?</div>
            <div className="grid grid-cols-3 pt-10 gap-5 ">
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-2")} className="radio" value="1" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Public Key</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-2")} className="radio" value="2" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Telephone number</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-2")} className="radio" value="3" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Personal data</div>
              </span>
            </div>
          </div>
          <div className="bg-bt/50 p-10 rounded-dd">
            <div className="font-kan text-4xl text-black ">You should REALLY keep this secret and private:</div>
            <div className="grid grid-cols-3 pt-10 gap-5 ">
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-3")} className="radio" value="1" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">My eyeballs</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-3")} className="radio" value="2" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Private key</div>
              </span>
              <span className="flex itemx-center">
                <input type="checkbox" {...register("answer-3")} className="radio" value="3" />
                <div className="grid items-center pl-3 font-kum text-2xl text-black">Best memes</div>
              </span>
            </div>
          </div>
          <button className="homeBT mx-auto" disabled={!write || isLoading} /* onClick={() => write?.()} */>
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
        </form>
      </div>
    </div>
  );
}
