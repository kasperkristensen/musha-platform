import React from "react";
import { BsPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { playTrack } from "../../../../spotify/api_calls";
import theme from "../../../../styles/theme";

interface SearchItemTrackProps {
  imgUrl: string | null;
  title: string;
  name: string;
  id: string;
  uri: string;
}

const PlayButton = styled.button`
  ${theme.mixins.flexCenter}
  position: absolute;
  background-color: var(--blue);
  color: white;
  font-size: 1.5rem;
  border: none;
  bottom: -10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  opacity: 0;
  -webkit-box-shadow: var(--shadow);
  -moz-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  padding-left: 8px;
  outline: none;
  transition: ease all 0.4s;

  &:hover,
  &:focus {
    filter: brightness(120%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 205px;
  height: 300px;
  border-radius: 5px;
  background-color: var(--grey);
  padding: 25px 25px;
  transition: var(--transition);

  &:hover,
  &:focus {
    background-color: white;

    &:hover,
    &:focus {
      ${PlayButton} {
        transform: translateY(-10px);
        opacity: 1;
      }
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
    color: var(--black);
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
        <PlayButton onClick={() => (uri ? playTrack(uri) : null)}>
          <BsPlayFill />
        </PlayButton>
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
