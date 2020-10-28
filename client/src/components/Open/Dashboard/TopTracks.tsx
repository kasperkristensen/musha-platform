import React from "react";
import styled from "styled-components";
import { SectionTitle } from "../Layout/SectionTitle";
import { TrackItem } from "./TrackItem";

interface TopTracksProps {
  topTracks: any | null;
}

const Container = styled.div``;

const StyledTopTracks = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopTracks: React.FC<TopTracksProps> = (props) => {
  console.log(props.topTracks);
  const tracks = props.topTracks;
  return tracks ? (
    <Container>
      <SectionTitle main="Most Played Songs" size="small" />
      <StyledTopTracks>
        {tracks.map((track, i) => (
          <TrackItem
            key={i}
            title={track.name}
            artists={track.artists}
            images={track.album.images}
            duration={track.duration_ms}
            uri={track.uri}
            id={track.id}
            num={i + 1 < 10 ? `0${i + 1}` : i + 1}
            type="list"
          />
        ))}
      </StyledTopTracks>
    </Container>
  ) : null;
};
