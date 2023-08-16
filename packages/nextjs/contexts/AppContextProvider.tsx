import {
  type ReactNode,
  useEffect,
  /* useEffect, */
  useState,
} from "react";
import { AppContext } from "./AppContext";
import { ccipReceiverSepoliaAbi } from "@/abis/ccipReceiverSepolia";
import { ccipSenderOptimismAbi } from "@/abis/ccipSenderOptimism";
import { useContractRead } from "wagmi";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [workingQuizId, setWorkingQuizId] = useState<bigint | null>(null);

  const { data: quizIdData /* isError: quizIdIsError */ } = useContractRead({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipReceiverSepoliaAbi,
    functionName: "quizId",
    watch: false,
  });

  const {
    data: fetchQuestionsData,
    // isError: fetchQuestionsIsError,
    // error: fetchQuestionsError,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipSenderOptimismAbi,
    functionName: "fetchQuestions",
    // args: [bytesToBigint(stringToBytes("1"))],
    args: [1n], // TODO: Hardcoded 1n value to fetch working quiz for demo, change this to workingQuizId to use the last quizId from the contract
    watch: false,
  });

  // console.log({ fetchQuestionsData, fetchQuestionsIsError, fetchQuestionsError });

  useEffect(() => {
    if (quizIdData) {
      setWorkingQuizId(quizIdData);
    }
  }, [quizIdData]);

  // console.log({ quizIdData, quizIdIsError, fetchQuestionsData, fetchQuestionsIsError });

  return (
    <AppContext.Provider
      value={{
        workingQuizId,
        selectedTeamId,
        setSelectedTeamId,
        questionsData: fetchQuestionsData as string[],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
