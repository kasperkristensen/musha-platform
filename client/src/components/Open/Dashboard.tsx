import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getRecentlyPlayed,
  getRecommendationsForTracks,
  getSeveralArtist,
} from "../../spotify/api_calls";
import { ArtistSuggestions } from "./ArtistSuggestions";
import { Player } from "./Player";
import { TrackSuggestion } from "./TrackSuggestion";

interface DashboardProps {}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-left: 280px;
  padding-top: 90px;
  padding-bottom: 90px;
  padding-right: 50px;
  background-color: rgb(249, 249, 249);
  &: scroll;
`;

const TrackSuggestionContainer = styled.div`
  h3 {
    font-size: var(--fz-xs);
    font-weight: 600;
  }
`;

function createArtistString(suggestions: any[]) {
  let artistsString = "";
  let i = 0;
  while (i < suggestions.length) {
    artistsString = artistsString.concat(`${suggestions[i].artists[0].id},`);
    i++;
  }
  artistsString = artistsString.concat(`${suggestions[i]}`);
  return artistsString;
}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [state, setState] = useState({
    recentlyPlayed: null,
    suggestedTracks: null,
    suggestedArtists: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      const recents = await getRecentlyPlayed();
      const suggestedTracks = await getRecommendationsForTracks(
        recents.data.items
      );
      const suggestedArtists = await getSeveralArtist(
        createArtistString(suggestedTracks.data.tracks)
      );
      setState({
        recentlyPlayed: recents.data,
        suggestedTracks: suggestedTracks.data,
        suggestedArtists: suggestedArtists.data,
      });
    };
    fetchData();
  }, []);
  var suggestions;
  if (state.suggestedTracks !== null) {
    suggestions = state.suggestedTracks;
  } else {
    suggestions = null;
  }
  return (
    <Container>
      <TrackSuggestionContainer>
        <h3>Suggested Track</h3>
        <TrackSuggestion suggestedTracks={suggestions ? suggestions : null} />
      </TrackSuggestionContainer>
      <ArtistSuggestions
        suggestions={
          state.suggestedArtists !== null
            ? state.suggestedArtists.artists
            : null
        }
      />
      <ArtistSuggestions
        suggestions={
          state.suggestedArtists !== null
            ? state.suggestedArtists.artists
            : null
        }
      />
      <ArtistSuggestions
        suggestions={
          state.suggestedArtists !== null
            ? state.suggestedArtists.artists
            : null
        }
      />
    </Container>
  );
};
