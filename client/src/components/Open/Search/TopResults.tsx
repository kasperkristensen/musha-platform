import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { SearchItemArtist } from "./SearchItem";

interface TopResultsProps {
  artists: any[] | null;
}

const Container = styled.div``;

const ArtistsContainer = styled.div`
  ${theme.mixins.flexBetween};
  flex-direction: row;
`;

export const TopResults: React.FC<TopResultsProps> = ({ artists }) => {
  return artists ? (
    <Container>
      <ArtistsContainer>
        {artists.map((artist, i) => (
          <SearchItemArtist
            key={i}
            imgUrl={artist.images.length > 0 ? artist.images[1].url : null}
            name={artist.name}
            id={artist.id}
          />
        ))}
      </ArtistsContainer>
    </Container>
  ) : (
    <p>loading...</p>
  );
};
