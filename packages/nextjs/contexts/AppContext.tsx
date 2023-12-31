import { createContext, useContext } from "react";

interface IAppContext {
  selectedTeamId: string;
  setSelectedTeamId: (teamId: string) => void;
  questionsData: string[];
}

export const AppContext = createContext<IAppContext>({
  selectedTeamId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTeamId: () => {},
  questionsData: [],
});

AppContext.displayName = "CroissantAppContext";

export const useAppContext = () => useContext(AppContext);
