import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { pausePlayback, startPlayback } from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import { BsPauseFill, BsPlayFill, BsArrowsAngleExpand } from "react-icons/bs";
import { concatArtists } from "../../../utils/utilFunctions";
import { useGlobal } from "../../../contexts/playbackContext";
import { updatePlayback } from "../../../utils/globalUpdaters";
import { fullTrackObject } from "../../../types/spotify/objectInterfaces";
import { ProgressBar } from "./ProgressBar";

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 50px;
  width: 350px;
  height: 80px;
  z-index: 999;

  @media (${theme.bp.tabletL}) {
    width: 100%;
    height: 80px;
    bottom: 0;
    left: 0;
    border-radius: 0px;
  }
`;

const StyledPlayer = styled.div`
  ${theme.mixins.flexBetween}
  height: 100%;
  position: relative;
  background-color: var(--liteblack);
  padding: 0 20px;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  border-radius: 5px;
`;

const StyledTrackInfo = styled.div`
  ${theme.mixins.flexCenter}
  flex-direction: row;
  align-items: center;

  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 5%;
  }
`;

const StyledTrackText = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  font-size: var(--fz-xxxs);

  p {
    margin: 0;
  }

  h5 {
    margin: 0;
    font-weight: 600;
    font-size: var(--fz-xxxs);
  }
`;

const StyledControls = styled.div`
  ${theme.mixins.flexBetween}
  align-items: center;
  font-size: 24px;
  width: 20%;
  margin-left: 5%;
  line-height: 0;
`;

const StyledPlayPause = styled.div`
  cursor: pointer;
`;

const StyledExpand = styled.div`
  font-size: 14px;
`;

export const Player: React.FC = () => {
  const { global, setGlobal } = useGlobal();
  const [progress, setProgress] = useState<string>("0");

  const fetchPlayback = async () => {
    global
      ? setGlobal({
          ...global,
          playback: await updatePlayback(),
        })
      : null;
  };

  useEffect(() => {
    fetchPlayback();
  }, []);

  if (
    global &&
    global.playback &&
    global.playback.is_playing &&
    global.playback.item
  ) {
    const nextUpdateTime =
      global.playback.item.duration_ms - global.playback.progress_ms;
    setTimeout(fetchPlayback, nextUpdateTime);
  }

  useEffect(() => {
    const tickPosition = () => {
      if (progress === "0") {
        let newProgress =
          global && global.playback && global.playback.item
            ? (
                (global.playback.progress_ms /
                  global.playback.item.duration_ms) *
                100
              ).toFixed(2)
            : "0";
        setProgress(newProgress);
      }
    };
    const interval = setInterval(() => tickPosition(), 100);

    return () => {
      clearInterval(interval);
    };
  });

  return global && global.playback?.item ? (
    <PlayerContainer>
      <StyledPlayer>
        <ProgressBar />
        <StyledTrackInfo>
          <img src={global.playback.item.album.images[1].url} />
          <StyledTrackText>
            <h5>{global.playback.item.name}</h5>
            <p>{concatArtists(global.playback.item.artists)}</p>
          </StyledTrackText>
        </StyledTrackInfo>
        <StyledControls>
          <StyledPlayPause>
            {global.playback.is_playing ? (
              <BsPauseFill
                onClick={() => {
                  pausePlayback();
                  setTimeout(() => fetchPlayback(), 800);
                }}
              />
            ) : (
              <BsPlayFill
                onClick={() => {
                  startPlayback();
                  setTimeout(() => fetchPlayback(), 800);
                }}
              />
            )}
          </StyledPlayPause>
          <StyledExpand>
            <BsArrowsAngleExpand />
          </StyledExpand>
        </StyledControls>
      </StyledPlayer>
    </PlayerContainer>
  ) : null;
};
