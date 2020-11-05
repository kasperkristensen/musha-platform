import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTrack } from "../../../spotify/api_calls";
import { useGetTrack } from "../../../spotify/api_calls";
import { fullTrackObject } from "../../../types/spotify/objectInterfaces";
import {
  concatArtists,
  millisToMinutesAndSeconds,
} from "../../../utils/utilFunctions";

interface NowPlayingProps {
  trackId: string;
}

const PositionPointer = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
  height: 6px;
  width: 6px;
  border-radius: 5px;
  background-color: var(--blue);
`;

export const NowPlaying: React.FC<NowPlayingProps> = ({ trackId }) => {
  const { track, data, error, errorMessage } = useGetTrack(trackId);
  const [position, setPosition] = useState({
    start: Date.now(),
    currentPosition: 0,
  });

  useEffect(() => {
    const tickPosition = () => {
      setPosition({
        ...position,
        currentPosition: Date.now() - position.start,
      });
    };
    const interval = setInterval(() => tickPosition(), 100);

    return () => {
      clearInterval(interval);
    };
  });

  const percentage = track
    ? +((position.currentPosition * 100) / track.duration_ms).toFixed(2)
    : 0;

  return track ? (
    <div>
      <img src={track.album.images[1].url} />
      <p>{track.name}</p>
      <p>{concatArtists(track.artists)}</p>
      <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      <div
        style={{
          width: percentage < 100 ? percentage + "%" : "100%",
          height: "3px",
          backgroundColor: "var(--blue)",
          position: "relative",
        }}
      >
        <PositionPointer></PositionPointer>
      </div>
    </div>
  ) : (
    <p>no DATA</p>
  );
};
