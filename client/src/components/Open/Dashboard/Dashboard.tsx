import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getRecentlyPlayed,
  getRecommendationsForTracks,
  getSeveralArtist,
  getTopArtistsShort,
  getTopTracksShort,
} from "../../../spotify/api_calls";
import { ArtistSuggestions } from "./ArtistSuggestions";
import { DiscoverGenres } from "./DiscoverGenres";
import { TopTracks } from "./TopTracks";
import { TrackSuggestion } from "./TrackSuggestion";
import { TrackSuggestions } from "./TrackSuggestions";

interface DashboardProps {}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-left: 280px;
  padding-top: 90px;
  padding-bottom: 90px;
  padding-right: 50px;
  background-color: rgb(249, 249, 249);
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
    topTracks: null,
    suggestedTracks: null,
    suggestedArtists: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      const recents = await getRecentlyPlayed();
      const suggestedTracks = await getRecommendationsForTracks(
        recents.data.items
      );
      const artistSeeds = await getRecommendationsForTracks(recents.data.items);
      const suggestedArtists = await getSeveralArtist(
        createArtistString(artistSeeds.data.tracks)
      );
      const topTracks = await getTopTracksShort();
      setState({
        recentlyPlayed: recents.data,
        suggestedTracks: suggestedTracks.data,
        suggestedArtists: suggestedArtists.data,
        topTracks: topTracks.data,
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

  var topTracks;
  if (state.topTracks !== null) {
    topTracks = state.topTracks;
  } else {
    topTracks = null;
  }

  return (
    <Container>
      <TrackSuggestions
        suggestedTracks={suggestions ? suggestions.tracks : null}
      />
      <TopTracks topTracks={topTracks ? topTracks.items.slice(0, 5) : null} />
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
