import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getRecentlyPlayed,
  getRecommendationsForTracks,
  getSeveralArtist,
  getTopArtistsShort,
  getTopTracksShort,
} from "../../spotify/api_calls";
import theme from "../../styles/theme";
import { ArtistSuggestions } from "../../components/Open/Dashboard/ArtistSuggestions";
import { TopTracks } from "../../components/Open/Dashboard/TopTracks";
import { TrackSuggestions } from "../../components/Open/Dashboard/TrackSuggestions";
import OpenLayout from "../../components/Open/Layout/OpenLayout";

const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  @media (${theme.bp.tabletL}) {
    display: block;
    margin-top: 70px;
  } ;
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

const Dashboard = () => {
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
    <>
      <TrackSuggestions
        suggestedTracks={suggestions ? suggestions.tracks : null}
      />
      <Preview>
        <TopTracks topTracks={topTracks ? topTracks.items.slice(0, 5) : null} />
        <TopTracks topTracks={topTracks ? topTracks.items.slice(0, 5) : null} />
      </Preview>
    </>
  );
};

export default Dashboard;