import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OpenLayout from "../../../components/Open/Layout/OpenLayout";
import { SearchItemArtist } from "../../../components/Open/Search/Artists/SearchItemArtist";
import { TopResultsArtists } from "../../../components/Open/Search/Artists/TopResultsArtists";
import { SearchItemTrack } from "../../../components/Open/Search/Tracks/SearchItemTrack";
import { TopResults } from "../../../components/Open/Search/TopResults";
import {
  topSearchResultsArtists,
  topSearchResultsTracks,
  useGetTopResults,
} from "../../../spotify/api_calls";
import {
  fullArtistObject,
  simplifiedArtistObject,
  simplifiedTrackObject,
} from "../../../types/spotify/objectInterfaces";
import { concatArtists } from "../../../utils/utilFunctions";
import IconLoader from "../../../components/icons/loader";

const Content = styled.div`
  overflow: hidden;
`;

const Search = () => {
  const [state, setState] = useState<any | null>({
    artists: null,
    tracks: null,
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const {
    topTracks,
    topArtists,
    topPlaylists,
    topAlbums,
    loading,
  } = useGetTopResults(query);

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    };
  }, []);

  var pathName: string | null;
  loaded ? (pathName = window.location.pathname) : (pathName = null);
  useEffect(() => {
    const fetchData = async () => {
      let regex = /q=.*[^/]/g;
      let term = window.location.pathname.match(regex);
      if (term !== null) {
        setQuery(term[0]);
      } else {
        setQuery("");
      }
    };
    fetchData();
  }, [pathName]);

  return loading ? (
    <IconLoader />
  ) : topTracks && topAlbums && topArtists && topPlaylists ? (
    <Content>
      {topArtists.length > 0 ? (
        <TopResults query={query} type="artists">
          {topArtists.map((artist: fullArtistObject, i: number) => (
            <SearchItemArtist
              key={i}
              imgUrl={artist.images.length > 0 ? artist.images[1].url : null}
              name={artist.name}
              id={artist.id}
            />
          ))}
        </TopResults>
      ) : null}
      {topTracks.length > 0 ? (
        <TopResults query={query} type="tracks">
          {topTracks.map((track: simplifiedTrackObject, i: number) => (
            <SearchItemTrack
              key={i}
              imgUrl={
                track.album.images.length > 0 ? track.album.images[1].url : null
              }
              title={track.name}
              name={concatArtists(track.artists)}
              id={track.id}
              uri={track.uri}
            />
          ))}
        </TopResults>
      ) : null}
    </Content>
  ) : null;
};

export default Search;
