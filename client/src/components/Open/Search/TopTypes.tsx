import React from "react";
import {
  useGetAlbum,
  useGetArtist,
  useGetTrack,
} from "../../../spotify/api_calls";
import IconLoader from "../../icons/loader";
import { TopResult } from "./TopResult";

interface TopTypeProps {
  id: string;
}

export const TopTrack: React.FC<TopTypeProps> = ({ id }) => {
  const { track, loading, error, errorMessage } = useGetTrack(id);
  return !loading && track ? (
    <TopResult
      artist={track.artists[0]}
      id={track.id}
      img={track.album.images[0].url}
      title={track.name}
      type="track"
      explicit={track.explicit}
    />
  ) : (
    <IconLoader />
  );
};

export const TopArtist: React.FC<TopTypeProps> = ({ id }) => {
  const { artist, loading, error, errorMessage } = useGetArtist(id);
  return !loading && artist ? (
    <TopResult
      artist={artist}
      id={artist.id}
      img={artist.images[0].url}
      title={artist.name}
      type="artist"
    />
  ) : (
    <IconLoader />
  );
};

export const TopAlbum: React.FC<TopTypeProps> = ({ id }) => {
  const { album, loading, error, errorMessage } = useGetAlbum(id);
  return !loading && album ? (
    <TopResult
      artist={album.artists[0]}
      id={album.id}
      img={album.images[0].url}
      title={album.name}
      type="album"
    />
  ) : (
    <IconLoader />
  );
};

export const TopPlaylist: React.FC<TopTypeProps> = ({ id }) => {
  const { artist: playlist, loading, error, errorMessage } = useGetArtist(id);
  return !loading && playlist ? (
    <TopResult
      artist={null}
      id={playlist.id}
      img={playlist.images[0].url}
      title={playlist.name}
      type="playlist"
    />
  ) : (
    <IconLoader />
  );
};
