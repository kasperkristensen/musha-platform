import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { pausePlayback, startPlayback } from "../../spotify/api_calls";
import theme from "../../styles/theme";
import { BsPauseFill, BsPlayFill, BsArrowsAngleExpand } from "react-icons/bs";

interface PlayerProps {
  track: any;
  playStatus: boolean;
}

const StyledPlayer = styled.div`
  ${theme.mixins.flexBetween}
  background-color: white;
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
`;

const StyledTrackInfo = styled.div`
  ${theme.mixins.flexCenter}
  flex-direction: row;
  align-items: center;

  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
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

export const Player: React.FC<PlayerProps> = (props) => {
  let playStatus = props.playStatus;
  return (
    <StyledPlayer>
      {props.track ? (
        <>
          <StyledTrackInfo>
            <img src={props.track.album.images[2].url} />
            <StyledTrackText>
              <h5>{props.track.name}</h5>
              <p>{props.track.artists[0].name}</p>
            </StyledTrackText>
          </StyledTrackInfo>
          <StyledControls>
            <StyledPlayPause>
              {playStatus === true ? (
                <BsPauseFill
                  onClick={() => {
                    pausePlayback();
                    playStatus = false;
                  }}
                />
              ) : (
                <BsPlayFill
                  onClick={() => {
                    startPlayback();
                    playStatus = true;
                  }}
                />
              )}
            </StyledPlayPause>
            <StyledExpand>
              <BsArrowsAngleExpand />
            </StyledExpand>
          </StyledControls>
        </>
      ) : null}
    </StyledPlayer>
  );
};
