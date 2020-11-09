import React, { useEffect, useState } from "react";
import { SearchItemArtist } from "../../../components/Open/Search/Artists/SearchItemArtist";
import { SearchItemTrack } from "../../../components/Open/Search/Tracks/SearchItemTrack";
import { TopResults } from "../../../components/Open/Search/TopResults";
import { useGetTopResults } from "../../../spotify/api_calls";
import {
  fullAlbumObject,
  fullArtistObject,
  fullTrackObject,
  imageObject,
  simplifiedAlbumObject,
  simplifiedArtistObject,
  simplifiedTrackObject,
} from "../../../types/spotify/objectInterfaces";
import { concatArtists } from "../../../utils/utilFunctions";
import IconLoader from "../../../components/icons/loader";
import { TopResultsContainer } from "../../../components/Open/Search/TopResultsContainer";
import { TopResult } from "../../../components/Open/Search/TopResult";
import {
  TopAlbum,
  TopArtist,
  TopTrack,
} from "../../../components/Open/Search/TopTypes";
import { TopTracksContainer } from "../../../components/Open/Search/TopTracks";
import { SearchItemAlbum } from "../../../components/Open/Search/Albums/SearchItemAlbum";

const Search = () => {
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

  const getTopResult = () => {
    if (topTracks && topArtists && topAlbums) {
      const trackPopularity =
        topTracks.length > 0 ? topTracks[0].popularity : 0;
      const artistPopularity =
        topArtists.length > 0 ? topArtists[0].popularity : 0;
      let type: string;
      let result:
        | fullTrackObject
        | fullArtistObject
        | simplifiedAlbumObject
        | null;
      if (trackPopularity > artistPopularity) {
        type = "track";
        result = topTracks[0];
        return { result, type };
      }
      if (artistPopularity > trackPopularity) {
        type = "artist";
        result = topArtists[0];
        return { result, type };
      }
      if (artistPopularity === trackPopularity) {
        type = "artist";
        result = topArtists[0];
        return { result, type };
      }
      if (topAlbums.length > 0) {
        type = "album";
        result = topAlbums[0];
        return { result, type };
      }
    }
  };

  const topResult = getTopResult();

  return loading ? (
    <IconLoader />
  ) : topTracks && topAlbums && topArtists && topPlaylists ? (
    <TopResultsContainer>
      {topResult && topResult.result && topResult.type === "track" ? (
        <TopTrack id={topResult.result.id} />
      ) : null}
      {topResult && topResult.result && topResult.type === "artist" ? (
        <TopArtist id={topResult.result.id} />
      ) : null}
      {topResult && topResult.result && topResult.type === "album" ? (
        <TopAlbum id={topResult.result.id} />
      ) : null}
      <TopTracksContainer
        tracks={topTracks.length > 0 ? topTracks : null}
        query={query}
      />
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
      {topAlbums.length > 0 ? (
        <TopResults query={query} type="albums">
          {topAlbums.map((album: simplifiedAlbumObject, i: number) => (
            <SearchItemAlbum
              key={i}
              imgUrl={album.images.length > 0 ? album.images[1].url : null}
              name={concatArtists(album.artists)}
              id={album.id}
              title={album.name}
            />
          ))}
        </TopResults>
      ) : null}
    </TopResultsContainer>
  ) : null;
};

export default Search;
