import { createContext, useContext } from "react";
import {
  contextInterface,
  currentlyPlayingContext,
} from "../types/spotify/objectInterfaces";

export type GlobalContextType = {
  global: contextInterface | null;
  setGlobal: (context: contextInterface) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  global: null,
  setGlobal: (global) => console.warn("No playback provided"),
});
export const useGlobal = () => useContext(GlobalContext);
