import { type ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { ccipReceiverSepoliaAbi } from "@/abis/ccipReceiverSepolia";
import { formatUnits, parseUnits } from "viem";
import { useContractRead } from "wagmi";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [workingQuizId, setWorkingQuizId] = useState("");

  const { data: quizIdData /*, isError: quizIdIsError */ } = useContractRead({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipReceiverSepoliaAbi,
    functionName: "quizId",
    watch: false,
  });

  const { data: fetchQuestionsData /* , isError: fetchQuestionsIsError */ } = useContractRead({
    address: process.env.NEXT_PUBLIC_CCI_SENDER_CONTRACT_ADDRESS as string,
    abi: ccipReceiverSepoliaAbi,
    functionName: "fetchQuestions",
    watch: false,
    args: [parseUnits("1", 9)],
  });

  useEffect(() => {
    if (quizIdData) {
      setWorkingQuizId(formatUnits(quizIdData, 9));
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
