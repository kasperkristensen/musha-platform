import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getArtist } from "../../../spotify/api_calls";
import theme from "../../../styles/theme";
import { roundFollowers } from "../../../utils/utilFunctions";

interface ArtistSuggestionsProps {
  suggestions: any[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem 2rem 2rem 2rem;
`;

const ContainerText = styled.div`
  ${theme.mixins.flexBetween};
  h3 {
    font-size: var(--fz-xs);
    font-weight: 600;
    color: var(--black);
    margin-bottom: 2rem;
  }
  a {
    color: var(--darkgrey);
    font-size: var(--fz-xs);
    transition: var(--transition);

    &:hover {
      color: var(--black);
    }
  }
`;

const ArtistContainer = styled.div`
  ${theme.mixins.flexBetween}
  border-radius: 5px;
`;

const Artist = styled.button`
  background-color: transparent;
  border: none;

  p {
    font-weight: 400;
    color: var(--black);
    font-size: var(--fz-xxs);
  }
`;

const ArtistPortrait = styled.img`
  height: 125px;
  width: 125px;
  object-fit: cover;
  border-radius: 100%;
`;

export const ArtistSuggestions: React.FC<ArtistSuggestionsProps> = (props) => {
  let fiveArtists;
  if (props.suggestions) {
    fiveArtists = props.suggestions.slice(1, 7);
  } else {
    fiveArtists = null;
  }
  return (
    <Container>
      <ContainerText>
        <h3>Suggested Artists</h3>
        <a href="#">See all</a>
      </ContainerText>
      <ArtistContainer>
        {fiveArtists
          ? fiveArtists.map(({ id, followers, images, name }, i) => (
              <Artist key={i}>
                <ArtistPortrait src={images[2].url} alt={`Image of ${name}`} />
                <h4>{name}</h4>
                <p>{roundFollowers(followers.total)}</p>
              </Artist>
            ))
          : null}
      </ArtistContainer>
    </Container>
  );
};
