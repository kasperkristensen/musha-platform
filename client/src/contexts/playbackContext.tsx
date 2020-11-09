import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { currentlyPlayingContext } from "../types/spotify/objectInterfaces";

// interface PlayBackState {
//   playback: currentlyPlayingContext | null;
//   setPlayback: React.Dispatch<React.SetStateAction<currentlyPlayingContext | null>>
// }

// const defaultPlayBack: currentlyPlayingContext | null = null

// const defaultPlayBackState: PlayBackState = {
//   playback: defaultPlayBack,
//   setPlayback: (): void => {},

// }

// export const PlayBackContext = createContext<PlayBackState | {}>(defaultPlayBackState);

// export const usePlayBackContext = (): PlayBackState => {
//   return useContext(PlayBackContext)
// }

// interface PlayBackContextProviderProps {
//   defaults?: Partial<currentlyPlayingContext> ;
//   children?: ReactNode;
// }

// export const PlayBackContextProvider = (
//   props: PlayBackContextProviderProps,
// ): ReactElement => {
//   const [playback, setPlayback] = useState<currentlyPlayingContext | null>({
//     ...defaultPlayBackState,
//     ...props.defaults,
//   })
//   return ();
// }

export type PlayBackContextType = {
  playback: currentlyPlayingContext | null;
  setPlayback: (playbackContext: currentlyPlayingContext) => void;
};

export const PlayBackContext = createContext<PlayBackContextType>({
  playback: null,
  setPlayback: (playback) => console.warn("No playback provided"),
});
export const usePlayback = () => useContext(PlayBackContext);
