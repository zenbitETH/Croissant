import { type ReactNode, useState } from "react";
import { AppContext } from "./AppContext";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [selectedTeamId, setSelectedTeamId] = useState("");

  return <AppContext.Provider value={{ selectedTeamId, setSelectedTeamId }}>{children}</AppContext.Provider>;
}
