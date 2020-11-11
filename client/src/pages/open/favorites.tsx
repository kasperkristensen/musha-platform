import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TopTracks } from "../../components/Open/Dashboard/TopTracks";
import { TrackItem } from "../../components/Open/Dashboard/TrackItem";
import { GeneratedSuggestions } from "../../components/Open/Favorites/GeneratedSuggestions";
import OpenLayout from "../../components/Open/Layout/OpenLayout";
import {
  getTopTracksLong,
  getTopTracksMedium,
  getTopTracksShort,
  playTrack,
} from "../../spotify/api_calls";
import theme from "../../styles/theme";
import { getUris } from "../../utils/utilFunctions";

interface favoritesProps {}

const TimeRangeButton = styled.button`
  border-radius: 0;
  border: none;
  transition: var(--transition);
  padding: 5px 15px;
  background-color: white;
  color: var(--liteblack);
  outline: none;

  &:hover,
  &:focus,
  &.active {
    background-color: var(--blue);
    color: white;
  }
`;

const TimeRangeContainer = styled.div`
  display: inline-block;
  border-radius: 5px;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);

  ${TimeRangeButton}:first-child {
    border-radius: 5px 0 0 5px;
    border-right: 1px solid var(--grey);
  }
  ${TimeRangeButton}:last-child {
    border-radius: 0 5px 5px 0;
    border-left: 1px solid var(--grey);
  }
`;

const ControlButton = styled.button`
  border-radius: 30px;
  border: none;
  transition: var(--transition);
  padding: 5px 30px;
  background-color: white;
  font-size: var(--fz-lg);
  font-weight: 600;
  transition: var(--transition);
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  outline: none;
  color: var(--liteblack);

  &:hover,
  &:focus {
    background-color: var(--grey);
  }
`;

const GenerateButton = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  background-color: white;
  color: var(--liteblack);
  border-radius: 8px;
  ${theme.mixins.flexCenter};
  transition: var(--transition);
  border: none;
  outline: none;
  margin-left: 1rem;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);

  &:hover,
  &:focus {
    background-color: var(--grey);
  }
`;

const ContainerBorder = styled.div`
  position: absolute;
  border-radius: 8px;
  background-color: var(--blue);
  opacity: 0.3;
  width: 100%;
  height: 102%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const ControlButtonContainer = styled.div`
  ${theme.mixins.flexCenter};
`;

const Buttons = styled.div`
  ${theme.mixins.flexBetween}
  margin: 30px 0;
`;

const Container = styled.div``;

const Divider = styled.span`
  display: block;
  border-top: 1px solid var(--liteblack);
  width: 100%;
`;

const Favorites: React.FC<favoritesProps> = ({}) => {
  const [topTracks, setTopTracks] = useState<any | null>(null);
  useEffect(() => {
    const fetchTopTracks = async () => {
      const topTracksData = await getTopTracksShort();
      setTopTracks(topTracksData.data.items);
    };
    fetchTopTracks();
  }, []);

  const fetchTopTracksByRange = (
    timeRange: "ALL_TIME" | "FOUR_WEEKS" | "SIX_MONTHS"
  ) => {
    switch (timeRange) {
      case "ALL_TIME":
        const fetchTopTracksLong = async () => {
          const topTracksData = await getTopTracksLong();
          setTopTracks(topTracksData.data.items);
        };
        fetchTopTracksLong();
        break;
      case "SIX_MONTHS":
        const fetchTopTracksMedium = async () => {
          const topTracksData = await getTopTracksMedium();
          setTopTracks(topTracksData.data.items);
        };
        fetchTopTracksMedium();
        break;
      case "FOUR_WEEKS":
        const fetchTopTracksShort = async () => {
          const topTracksData = await getTopTracksShort();
          setTopTracks(topTracksData.data.items);
        };
        fetchTopTracksShort();
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <h1>Most Played Songs</h1>
      <Buttons>
        <ControlButtonContainer>
          <ControlButton onClick={() => playTrack(getUris(topTracks))}>
            Play
          </ControlButton>
          <GenerateButton>
            <img src="/logo.svg" alt="logo" />
            {/* <ContainerBorder /> */}
          </GenerateButton>
        </ControlButtonContainer>
        <TimeRangeContainer>
          <TimeRangeButton onClick={() => fetchTopTracksByRange("FOUR_WEEKS")}>
            4 Weeks
          </TimeRangeButton>
          <TimeRangeButton onClick={() => fetchTopTracksByRange("SIX_MONTHS")}>
            6 Months
          </TimeRangeButton>
          <TimeRangeButton onClick={() => fetchTopTracksByRange("ALL_TIME")}>
            All Time
          </TimeRangeButton>
        </TimeRangeContainer>
      </Buttons>
      {topTracks
        ? topTracks.map((track, i) => (
            <React.Fragment key={i}>
              <TrackItem
                name={track.name}
                artists={track.artists}
                images={track.album.images}
                duration={track.duration_ms}
                uri={getUris(topTracks.slice(i, topTracks.length))}
                id={track.id}
                num={i + 1 < 10 ? `0${i + 1}` : i + 1}
                type="list"
              />
              {i < topTracks.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))
        : null}
    </Container>
  );
};

export default Favorites;
