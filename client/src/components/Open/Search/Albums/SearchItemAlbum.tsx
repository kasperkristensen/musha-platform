import React from "react";
import styled from "styled-components";
import { playTrack, useGetAlbumTracks } from "../../../../spotify/api_calls";
import theme from "../../../../styles/theme";
import { getUris } from "../../../../utils/utilFunctions";
import IconLoader from "../../../icons/loader";

interface SearchItemAlbumProps {
  imgUrl: string | null;
  title: string;
  name: string;
  id: string;
}

const PlayButtonContainer = styled.div`
  position: absolute;
  bottom: -4px;
  -webkit-transform: translateY(8px);
  transform: translateY(8px);
  opacity: 0;
  -webkit-transition: var(--transition);
  transition: var(--transition);
  -webkit-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  z-index: 2;
  border-radius: 500px;
  right: -4px;
  outline: none;
`;
const PlayButton = styled.button`
  --size: 48px;
  color: #fff;
  background: var(--gradiant);
  position: relative;
  z-index: 1;
  --size: 40px;
  font-size: 8px;
  border: 0;
  border-radius: 500px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: var(--size);
  width: var(--size);
  min-width: var(--size);
  outline: none;
`;

const SVG = styled.svg`
  height: 24px;
  width: 24px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: var(--liteblack);
  padding: 25px 25px;
  transition: var(--transition);

  &:hover,
  &:focus {
    -webkit-box-shadow: var(--shadow);
    -moz-box-shadow: var(--shadow);
    box-shadow: var(--shadow);
    ${PlayButtonContainer} {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
`;

const CoverContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-bottom: 10%;
`;

const Cover = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 2px;
  object-fit: cover;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;

  p {
    margin: 0;
  }
  p:first-child {
    font-weight: 600;
    color: var(--mainColor);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p:last-child {
    color: var(--darkgrey);
    font-size: var(--fz-xs);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LoadingContainer = styled.div`
  ${theme.mixins.flexCenter}
`;

export const SearchItemAlbum: React.FC<SearchItemAlbumProps> = ({
  imgUrl,
  title,
  name,
  id,
}) => {
  const { tracks, loading } = useGetAlbumTracks(id);
  return tracks && !loading ? (
    <Container>
      <CoverContainer>
        <PlayButtonContainer>
          <PlayButton onClick={() => playTrack(getUris(tracks))}>
            <SVG height="24px" width="24px" role="img" viewBox="0 0 24 24">
              <polygon
                points="21.57 12 5.98 3 5.98 21 21.57 12"
                fill="currentColor"
              />
            </SVG>
          </PlayButton>
        </PlayButtonContainer>
        <Cover
          src={imgUrl ? imgUrl : "/user-placeholder.png"}
          alt={`Image of ${name}`}
        />
      </CoverContainer>
      <Info>
        <p onClick={() => console.log("Track id: ", id)}>{title}</p>
        <p>{name}</p>
      </Info>
    </Container>
  ) : (
    <LoadingContainer>
      <IconLoader />
    </LoadingContainer>
  );
};
