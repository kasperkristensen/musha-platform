import React from "react";
import styled from "styled-components";
import { useGetTopTracks } from "../../../spotify/api_calls";
import { SectionTitle } from "../Layout/SectionTitle";
import { TrackItem } from "./TrackItem";

const Container = styled.div``;

const StyledTopTracks = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopTracks = () => {
  const { tracks, loading, error, errorMessage } = useGetTopTracks();
  return tracks ? (
    <Container>
      <SectionTitle main="Most Played Songs" size="small" />
      <StyledTopTracks>
        {tracks.slice(0, 5).map((track, i) => (
          <TrackItem
            key={i}
            name={track.name}
            artists={track.artists}
            images={track.album.images}
            duration={track.duration_ms}
            uri={track.uri}
            id={track.id}
            num={i + 1 < 10 ? `0${i + 1}` : `${i + 1}`}
            type="list"
          />
        ))}
      </StyledTopTracks>
    </Container>
  ) : null;
};
