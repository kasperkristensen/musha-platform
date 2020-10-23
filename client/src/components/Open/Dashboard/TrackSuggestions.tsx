import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { SectionTitle } from "../SectionTitle";
import { TrackItem } from "./TrackItem";

interface TrackSuggestionsProps {
  suggestedTracks: any | null;
}

const StyledSuggestions = styled.div`
  ${theme.mixins.flexCenter}
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const TrackSuggestions: React.FC<TrackSuggestionsProps> = (props) => {
  const suggestedTracks = props.suggestedTracks;
  return suggestedTracks !== null ? (
    <>
      <SectionTitle main="Suggested Tracks" tagline="" />
      <StyledSuggestions>
        {suggestedTracks.map((track, i: number) => (
          <TrackItem
            key={i}
            title={track.name}
            artists={track.artists}
            images={track.album.images}
            duration={track.duration_ms}
            type="large"
            id={track.id}
            uri={track.uri}
          />
        ))}
      </StyledSuggestions>
    </>
  ) : null;
};
