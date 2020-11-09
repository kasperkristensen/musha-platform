import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  pausePlayback,
  startPlayback,
  useGetCurrentPlaypack,
  useGetPlayBackWatcher,
} from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import { BsPauseFill, BsPlayFill, BsArrowsAngleExpand } from "react-icons/bs";
import { concatArtists } from "../../../utils/utilFunctions";
import { usePlayback } from "../../../contexts/playbackContext";

interface PlayerProps {
  track: any;
  playStatus: boolean;
}

const StyledPlayer = styled.div`
  ${theme.mixins.flexBetween}
  background-color: var(--liteblack);
  position: fixed;
  bottom: 30px;
  right: 50px;
  width: 350px;
  height: 80px;
  padding: 0 20px;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  border-radius: 5px;
  z-index: 999;

  @media (${theme.bp.tabletL}) {
    width: 100%;
    height: 80px;
    bottom: 0;
    left: 0;
    border-radius: 0px;
  }
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
  const { playback, setPlayback } = usePlayback();
  let ticker = false;
  const {
    playBackSnapshot,
    loading,
    error,
    errorMessage,
  } = useGetCurrentPlaypack(ticker);
  return playback ? (
    <StyledPlayer>
      <StyledTrackInfo>
        <img src={playback.item.album.images[1].url} />
        <StyledTrackText>
          <h5>{playback.item.name}</h5>
          <p>{concatArtists(playback.item.artists)}</p>
        </StyledTrackText>
      </StyledTrackInfo>
      <StyledControls>
        <StyledPlayPause>
          {playback.is_playing ? (
            <BsPauseFill
              onClick={() => {
                pausePlayback();
                ticker = !ticker;
                playBackSnapshot ? setPlayback(playBackSnapshot) : null;
              }}
            />
          ) : (
            <BsPlayFill
              onClick={() => {
                startPlayback();
                ticker = !ticker;
                playBackSnapshot ? setPlayback(playBackSnapshot) : null;
              }}
            />
          )}
        </StyledPlayPause>
        <StyledExpand>
          <BsArrowsAngleExpand />
        </StyledExpand>
      </StyledControls>
    </StyledPlayer>
  ) : null;
};
