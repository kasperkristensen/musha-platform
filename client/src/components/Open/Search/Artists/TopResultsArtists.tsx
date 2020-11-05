import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import theme from "../../../../styles/theme";
import { SearchItemArtist } from "./SearchItemArtist";

interface TopResultsArtistsProps {
  artists: any[] | null;
  query: string | null;
}

const Container = styled.div``;

const ArtistsContainer = styled.div`
  ${theme.mixins.flexBetween};
  flex-direction: row;
`;

export const TopResultsArtists: React.FC<TopResultsArtistsProps> = ({
  artists,
  query,
}) => {
  const router = useRouter();
  return artists ? (
    <Container>
      <h1>Artists</h1>
      <button onClick={() => router.push(`artists/${query}`)}>See All</button>
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
