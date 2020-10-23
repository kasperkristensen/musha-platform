import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import styled from "styled-components";
import { playTrack, saveTracks } from "../../../spotify/api_calls";
import theme from "../../../styles/theme";

const TrackBanner = styled.div`
  ${theme.mixins.flexBetween}
  padding-left: 10px;
  transition: var(--transition);

  img {
    width: 180px;
    user-select: none;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 38px;
  max-width: 600px;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Artists = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: var(--blue);
  margin-block-start: 0;
  margin-block-end: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

const ListenButton = styled.button`
  background-color: var(--blue);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 2px;
  width: 115px;
  height: 35px;
  cursor: pointer;

  &.active {
    border: none;
  }
`;

const LikeButton = styled.div`
  ${theme.mixins.flexCenter}
  font-size: 18px;
  padding-top: 2px;
  height: 32px;
  width: 32px;
  border-radius: 100%;
  border: 2px solid var(--grey);
  color: var(--darkgrey);
  line-height: 0;
  cursor: pointer;
  margin-left: 20px;
  transition: var(--transition);

  &:hover {
    color: var(--blue);
    border: 2px solid var(--blue);
  }
`;

function getAllArtists(artists: []): string {
  let allArtists = "";
  let i = 0;
  while (artists.length - 1 > i) {
    allArtists = allArtists.concat(`${artists[i].name}, `);
    i++;
  }
  allArtists = allArtists.concat(artists[i].name);

  return allArtists;
}

interface TrackSuggestionProps {
  suggestedTracks: any;
}

export const TrackSuggestion: React.FC<TrackSuggestionProps> = (props) => {
  const [count, setCount] = useState(0);

  let suggestedTrack;
  let suggestedTracksLength;
  if (
    props.suggestedTracks !== null &&
    props.suggestedTracks.tracks.length > 0
  ) {
    suggestedTrack = props.suggestedTracks.tracks[count];
    suggestedTracksLength = props.suggestedTracks.tracks.length;
  } else {
    suggestedTrack = null;
    suggestedTracksLength = 0;
  }
  return (
    <TrackBanner>
      {suggestedTrack ? (
        <>
          <div>
            <Title>{suggestedTrack.name}</Title>
            <Artists>
              {suggestedTrack.artists.length > 1
                ? getAllArtists(suggestedTrack.artists)
                : suggestedTrack.artists[0].name}
            </Artists>
            <ButtonContainer>
              <ListenButton onClick={() => playTrack(suggestedTrack.uri)}>
                Listen Now
              </ListenButton>
              <LikeButton onClick={() => saveTracks([suggestedTrack.id])}>
                <GoHeart />
              </LikeButton>
            </ButtonContainer>
          </div>
          <img src={suggestedTrack.album.images[1].url} />
        </>
      ) : null}
    </TrackBanner>
  );
};
