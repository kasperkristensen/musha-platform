import React from "react";
import styled from "styled-components";
import { playTrack } from "../../../../spotify/api_calls";

interface SearchItemTrackProps {
  imgUrl: string | null;
  title: string;
  name: string;
  id: string;
  uri: string;
}

const PlayButtonContainer = styled.div`
  pointer-events: none;
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

  &:hover,
  &:focus {
    bottom: 40px;
  }
`;
const PlayButton = styled.button`
  --size: 48px;
  color: #fff;
  background-color: var(--darkblack);
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

export const SearchItemTrack: React.FC<SearchItemTrackProps> = ({
  imgUrl,
  title,
  name,
  id,
  uri,
}) => {
  return (
    <Container>
      <CoverContainer>
        <PlayButtonContainer>
          <PlayButton onClick={() => playTrack(uri)}>
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
  );
};
