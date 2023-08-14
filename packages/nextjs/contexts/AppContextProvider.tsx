import { type ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { ccipReceiverSepoliaAbi } from "@/abis/ccipReceiverSepolia";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [workingQuizId, setWorkingQuizId] = useState("");

  const { data: quizIdData /*, isError: quizIdIsError */ } = useContractRead({
    address: "0x8a60871E8E822BA8f66899Fb079990293e9C0CB5",
    abi: ccipReceiverSepoliaAbi,
    functionName: "quizId",
    watch: false,
  });

  const { data: fetchQuestionsData /* , isError: fetchQuestionsIsError */ } = useContractRead({
    address: "0x8a60871E8E822BA8f66899Fb079990293e9C0CB5",
    abi: ccipReceiverSepoliaAbi,
    functionName: "fetchQuestions",
    watch: false,
    args: [quizIdData as bigint],
  });

  useEffect(() => {
    if (quizIdData) {
      setWorkingQuizId(formatUnits(quizIdData, 9));
    }
  }, [quizIdData]);

  // console.log({ quizIdData, quizIdIsError, fetchQuestionsData, fetchQuestionsIsError });

  return (
    <AppContext.Provider
      value={{ selectedTeamId, setSelectedTeamId, questionsData: fetchQuestionsData as string[], workingQuizId }}
    >
      {children}
    </AppContext.Provider>
  );
}
