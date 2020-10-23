import React from "react";
import styled, { css } from "styled-components";
import theme from "../../../styles/theme";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoMdMore } from "react-icons/io";
import { playTrack } from "../../../spotify/api_calls";
import {
  concatArtists,
  millisToMinutesAndSeconds,
} from "../../../utils/utilFunctions";

interface TrackItemProps {
  title: string;
  artists: string[];
  images: any[];
  id: string;
  uri: string;
  duration: string;
  num?: string;
  type: "large" | "medium" | "small" | "list";
}

const StyledTrack = styled.div.attrs((props) => ({
  type: props.type || "list",
}))`
  ${(props) =>
    props.type === "list" &&
    css`
      ${theme.mixins.flexBetween}
      padding: 10px 20px;
      transition: var(--transition);
      border-radius: 5px;

      &:focus,
      &:hover {
        -webkit-box-shadow: var(--shadow);
        -moz-box-shadow: var(--shadow);
        box-shadow: var(--shadow);

        ${StyledOptions} {
          opacity: 1;
        }
      }
    `}
  ${(props) =>
    props.type === "large" &&
    css`
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      scroll-snap-align: center;
      }
    `}
`;

const StyledTrackNumber = styled.p`
  color: var(--darkgrey);
  margin-right: 10px;
  font-size: var(--fz-xxs);
`;

const StyledCover = styled.div.attrs((props) => ({
  type: props.type || "list",
}))`
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  outline: none;

  ${(props) =>
    props.type === "list" &&
    css`
      height: 50px;
      width: 50px;
      z-index: 1;
      margin-right: 10px;
      &:hover,
      &:focus {
        ${StyledOverlay} {
          opacity: 1;
        }
      }
    `}

  ${(props) =>
    props.type === "large" &&
    css`
      height: 220px;
      width: 220px;
      z-index: 1;
      margin-bottom: 1.5em;
      &:hover,
      &:focus {
        ${StyledOverlay} {
          opacity: 1;
        }
      }
    `}
`;

const StyledOverlay = styled.div`
  ${theme.mixins.flexBetween}
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  outline: none;
  transition: var(--transition);
  font-size: 36px;
  color: white;
  padding: 0 10%;
  z-index: 2;

  ${(props) =>
    props.type === "list" &&
    css`
      font-size: 10px;
    `}
`;

const StyledCoverShadow = styled.img`
  filter: blur(8px);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 10px;
  z-index: -1;
  outline: none;
`;

const StyledTrackInfo = styled.div.attrs((props) => ({
  type: props.type || "list",
}))`
  ${(props) =>
    props.type === "large" &&
    css`
      ${theme.mixins.flexCenter}
      flex-direction: column;
    `}
`;

const StyledTitle = styled.p.attrs((props) => ({
  type: props.type || "list",
}))`
  font-weight: 600;
  color: var(--black);
  margin: 0;
  font-size: var(--fz-xxs)
    ${(props) =>
      props.type === "large" &&
      css`
        font-weight: 600;
        color: var(--black);
      `};
`;

const StyledArtist = styled.p.attrs((props) => ({
  type: props.type || "list",
}))`
  font-weight: 400;
  color: var(--darkgrey);
  margin: 0;
  font-size: var(--fz-xxs)
    ${(props) =>
      props.type === "large" &&
      css`
        font-weight: 400;
        color: var(--darkgrey);
      `};
`;

const StyledListBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTrackControls = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

const StyledOptions = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: var(--transition);
`;

const StyledDuration = styled.p`
  color: var(--darkgrey);
  font-size: var(--fz-xxs);
`;

/**
 * Track item that displays a track, and enables the user to listen to directly or go to the tracks page
 * @param props
 */
export const TrackItem: React.FC<TrackItemProps> = (props) => {
  return props.type === "list" ? (
    <StyledTrack>
      <StyledListBox>
        {props.num ? <StyledTrackNumber>{props.num}</StyledTrackNumber> : null}
        <StyledCover type={props.type}>
          <StyledOverlay>
            <BsPlayFill onClick={() => playTrack(props.uri)} />
          </StyledOverlay>
          <img src={props.images[1].url} alt={`Cover Art for ${props.title}`} />
        </StyledCover>
        <StyledTrackInfo>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledArtist>{concatArtists(props.artists)}</StyledArtist>
        </StyledTrackInfo>
      </StyledListBox>
      <StyledListBox>
        <StyledDuration>
          {millisToMinutesAndSeconds(props.duration)}
        </StyledDuration>
        <StyledTrackControls>
          <StyledOptions>
            <BsThreeDots />
          </StyledOptions>
          <GoHeart />
        </StyledTrackControls>
      </StyledListBox>
    </StyledTrack>
  ) : (
    <StyledTrack type={props.type}>
      {props.num ? <StyledTrackNumber>{props.num}</StyledTrackNumber> : null}
      <StyledCover type={props.type}>
        <StyledCoverShadow src={props.images[0].url} />
        <StyledOverlay>
          <GoHeart />
          <BsPlayFill onClick={() => playTrack(props.uri)} />
          <IoMdMore />
        </StyledOverlay>
        <img src={props.images[1].url} alt={`Cover Art for ${props.title}`} />
      </StyledCover>
      <StyledTrackInfo>
        <StyledTitle>{props.title}</StyledTitle>
        <StyledArtist>{concatArtists(props.artists)}</StyledArtist>
      </StyledTrackInfo>
    </StyledTrack>
  );
};
