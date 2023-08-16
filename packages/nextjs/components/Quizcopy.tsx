import { useState } from "react";
import { ccipSenderOptimismAbi } from "@/abis/ccipSenderOptimism";
import Button from "@/components/ui/Button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import * as z from "zod";

const FormSchema = z.object({
  answer01: z.enum(["1", "2", "3"], {
    required_error: "You need to select a notification type.",
  }),
  answer02: z.enum(["1", "2", "3"], {
    required_error: "You need to select a notification type.",
  }),
  answer03: z.enum(["1", "2", "3"], {
    required_error: "You need to select a notification type.",
  }),
});

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState("");
  const { workingQuizId } = useAppContext();

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipSenderOptimismAbi,
    functionName: "registerUserAnswers",
    args: [workingQuizId as bigint, userAnswers], // TODO: Check types of args
    enabled: workingQuizId !== null,
  });

  const { data, write } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
    // data: data2,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  // console.log({ data, isLoading, isSuccess, data2 });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const answers = Object.values(data)
      .map(value => value)
      .join("");

    setUserAnswers(answers);

    if (data && answers) {
      write?.();
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <FormProvider {...form}>
      <div className="overflow-hidden text-center h-screen grid items-center  relative">
        <div className="grid gap-5 mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="answer01"
              render={({ field }) => (
                <div className="bg-bt/50 p-10 rounded-dd">
                  <div className="font-kan text-4xl text-black ">
                    Tool used to interact with Daps and smart contracts:
                  </div>
                  <div className="justify-evenly px-20">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 pt-10 gap-5 "
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="1" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Hammer
                        </FormLabel>{" "}
                        {/* grid items-center pl-3 font-kum text-2xl text-black" */}
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="2" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          E-mail
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="3" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Wallet
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </div>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="answer02"
              render={({ field }) => (
                <div className="bg-bt/50 p-10 rounded-dd">
                  <div className="font-kan text-4xl text-black ">
                    Your wallet has two keys, which one is safe to share?
                  </div>
                  <div className="justify-evenly px-20">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 pt-10 gap-5 "
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="1" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Public Key
                        </FormLabel>{" "}
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="2" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Telephone number
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="3" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Personal data
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </div>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="answer03"
              render={({ field }) => (
                <div className="bg-bt/50 p-10 rounded-dd">
                  <div className="font-kan text-4xl text-black ">You should REALLY keep this secret and private:</div>
                  <div className="justify-evenly px-20">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 pt-10 gap-5 items-center"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="1" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          My eyeballs
                        </FormLabel>{" "}
                        {/* grid items-center pl-3 font-kum text-2xl text-black" */}
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="2" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Private key
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="radio" value="3" />
                        </FormControl>
                        <FormLabel className="font-normal grid items-center pl-3 font-kum text-2xl text-black">
                          Best memes
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </div>
                </div>
              )}
            />
            <Button
              type="submit"
              className="homeBT mx-auto"
              disabled={!write || isLoading} /* onClick={() => write?.()} */
            >
              {isLoading ? "Verifying" : "Verify answers"}
            </Button>
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
    </FormProvider>
  );
}
