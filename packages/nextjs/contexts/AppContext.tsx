import { createContext, useContext } from "react";

interface IAppContext {
  selectedTeamId: string;
  setSelectedTeamId: (teamId: string) => void;
}

export const AppContext = createContext<IAppContext>({
  selectedTeamId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTeamId: () => {},
});

AppContext.displayName = "CroissantAppContext";

export const useAppContext = () => useContext(AppContext);
