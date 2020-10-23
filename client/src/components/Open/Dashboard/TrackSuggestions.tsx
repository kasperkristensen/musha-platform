import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding: 20px 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  ${theme.mixins.flexBetween}
  align-items: center;
`;

const Controls = styled.div`
  ${theme.mixins.flexBetween}
  width: 70px;
`;

export const TrackSuggestions: React.FC<TrackSuggestionsProps> = (props) => {
  const suggestedTracks = props.suggestedTracks;
  const node = useRef(undefined);

  const handleClick = (scrollOffset: number) => {
    node.current.scrollLeft += scrollOffset;
  };

  return suggestedTracks !== null ? (
    <>
      <Top>
        <SectionTitle main="Suggested Tracks" tagline="" />
        <Controls>
          <FaChevronLeft onClick={() => handleClick(-220)} />
          <FaChevronRight onClick={() => handleClick(220)} />
        </Controls>
      </Top>
      <StyledSuggestions ref={node}>
        {suggestedTracks.map((track, i) => (
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
