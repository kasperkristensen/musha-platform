import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { SectionTitle } from "../SectionTitle";
import { ArrowIcon } from "./ArrowIcon";
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
  padding: 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  ${theme.mixins.flexBetween}
  align-items: center;
`;

const Icon = styled.div.attrs((props) => ({
  enabled: props.enabled,
}))`
  display: block;
`;

const Controls = styled.div`
  ${theme.mixins.flexBetween}
  width: 70px;
`;

export const TrackSuggestions: React.FC<TrackSuggestionsProps> = (props) => {
  const suggestedTracks = props.suggestedTracks;
  const node = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState({
    min: true,
    max: false,
  });

  /**
   * Disables buttons when they can not scroll any further
   * @param scrollOffset: number
   */
  const handleClick = (scrollOffset: number) => {
    if (node.current !== null) {
      var maxScrollLeft = node.current.scrollWidth - node.current.clientWidth;
      node.current.scrollLeft += scrollOffset;
      if (node.current.scrollLeft < 440) {
        setScrollPosition({ ...scrollPosition, min: true });
      }
      if (node.current.scrollLeft > 440) {
        setScrollPosition({ ...scrollPosition, min: false });
      }
      if (node.current.scrollLeft >= node.current.clientWidth - 440) {
        setScrollPosition({ ...scrollPosition, max: true });
      }
      if (node.current.scrollLeft <= maxScrollLeft - 220) {
        setScrollPosition({ ...scrollPosition, max: false });
      }
      console.log("Scroll Width: ", node.current.scrollLeft);
      console.log("Client Width: ", node.current.clientWidth);
    }
  };

  return suggestedTracks !== null ? (
    <>
      <Top>
        <SectionTitle main="Suggested Tracks" size="large" />
        <Controls>
          <ArrowIcon
            direction="left"
            update={() => handleClick(-440)}
            dis={scrollPosition.min}
          />
          <ArrowIcon
            direction="right"
            update={() => handleClick(440)}
            dis={scrollPosition.max}
          />
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
