import { createContext, useContext } from "react";

export const SelectedCardContext = createContext({value: undefined, setValue:() => {}});

export const useSelectedCard = () => useContext(SelectedCardContext);