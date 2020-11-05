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
import { MdOpenInNew } from "react-icons/md";
import {
  imageObject,
  simplifiedArtistObject,
} from "../../../types/spotify/objectInterfaces";

interface TrackItemProps {
  name: string;
  artists: simplifiedArtistObject[];
  images: imageObject[];
  id: string;
  uri: string;
  duration: number;
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
        ${StyledOverlay} {
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
  border-radius: 2%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 2%;
  }
  outline: none;
  user-select: none;

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
        ${StyledCoverShadow} {
          filter: blur(8px) brightness(40%);
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
  user-select: none;
  border-radius: 2%;

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
  transition: var(--transition);
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
    <StyledTrack onDoubleClick={() => playTrack(props.uri)}>
      <StyledListBox>
        {props.num ? <StyledTrackNumber>{props.num}</StyledTrackNumber> : null}
        <StyledCover type={props.type}>
          <StyledOverlay>
            <BsPlayFill onClick={() => playTrack(props.uri)} />
          </StyledOverlay>
          <img src={props.images[1].url} alt={`Cover Art for ${props.name}`} />
        </StyledCover>
        <StyledTrackInfo>
          <StyledTitle>{props.name}</StyledTitle>
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
          <MdOpenInNew />
        </StyledTrackControls>
      </StyledListBox>
    </StyledTrack>
  ) : (
    <StyledTrack type={props.type} onDoubleClick={() => playTrack(props.uri)}>
      {props.num ? <StyledTrackNumber>{props.num}</StyledTrackNumber> : null}
      <StyledCover type={props.type}>
        <StyledCoverShadow src={props.images[0].url} />
        <StyledOverlay>
          <GoHeart />
          <BsPlayFill onClick={() => playTrack(props.uri)} />
          <IoMdMore />
        </StyledOverlay>
        <img src={props.images[1].url} alt={`Cover Art for ${props.name}`} />
      </StyledCover>
      <StyledTrackInfo>
        <StyledTitle>{props.name}</StyledTitle>
        <StyledArtist>{concatArtists(props.artists)}</StyledArtist>
      </StyledTrackInfo>
    </StyledTrack>
  );
};
