import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import {
  getRecentlyPlayed,
  getRecommendationsForTracks,
  useGetRecentlyPlayed,
  useGetRecommendationsForTracks,
  useGetRecommendationsForTracksOnRecents,
} from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import {
  playHistoryResponse,
  recommendationsResponseObject,
  simplifiedTrackObject,
} from "../../../types/spotify/objectInterfaces";
import { SectionTitle } from "../Layout/SectionTitle";
import { ArrowIcon } from "./ArrowIcon";
import { TrackItem } from "./TrackItem";

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

const Icon = styled.div`
  display: block;
`;

const Controls = styled.div`
  ${theme.mixins.flexBetween}
  width: 70px;
`;

export const TrackSuggestions = () => {
  const node = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({
    min: true,
    max: false,
  });

  const {
    recommendationsResponse,
    loading,
    error,
    errorMessage,
  } = useGetRecommendationsForTracksOnRecents();
  const tracks = recommendationsResponse?.tracks;

  /**
   * Disables buttons when they can not scroll any further
   * @param scrollOffset
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
  return tracks ? (
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
        {tracks.map((track, i) => (
          <TrackItem
            key={i}
            name={track.name}
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
  ) : // TODO: If loading and if error handling
  null;
};
