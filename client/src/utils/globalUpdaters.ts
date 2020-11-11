import { useGlobal } from "../contexts/playbackContext";
import { getCurrentPlayback, getSavedObjects } from "../spotify/api_calls";
import {
  currentlyPlayingContext,
  savedInterface,
} from "../types/spotify/objectInterfaces";

export const updatePlayback = async () => {
  const playbackInfo = await getCurrentPlayback();
  const playback: currentlyPlayingContext = playbackInfo.data;
  return playback;
};

export const updateSavedObjects = async () => {
  const savedObjects: savedInterface = await getSavedObjects();
  return savedObjects;
};
