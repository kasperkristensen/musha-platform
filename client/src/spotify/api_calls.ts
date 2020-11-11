import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
  useUserQuery,
} from "../generated/graphql";
import { getHashParams } from "../utils/getHashParams";
import {
  currentlyPlayingContext,
  fullAlbumObject,
  fullArtistObject,
  fullPlaylistObject,
  fullTrackObject,
  pagingObject,
  playHistoryObject,
  playHistoryResponse,
  recommendationsResponseObject,
  savedAlbumObject,
  savedInterface,
  savedTrackObject,
  serverResponse,
  simplifiedAlbumObject,
  simplifiedArtistObject,
  simplifiedPlaylistObject,
  simplifiedTrackObject,
} from "../types/spotify/objectInterfaces";
import { concatIds } from "../utils/utilFunctions";

const EXPIRATION_TIME = 1000 * 60 * 60; //1 HOUR IN MILLISECONDS

const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", Date.now().toString());
const setLocalAccessToken = (localToken: any) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", localToken);
};
const setLocalRefreshToken = (localRefreshtoken: any) =>
  window.localStorage.setItem("spotify_refresh_token", localRefreshtoken);

const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const { error, access_token, refresh_token } = getHashParams();

    if (error) {
      console.warn(error);
      refreshAccessToken();
    }

    // If token has expired
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
      console.warn("Access token has expired, refreshing...");
      refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();
    const localRefreshToken = getLocalRefreshToken();

    // If there is no REFRESH token in local storage, set it as `refresh_token` from params
    if (!localRefreshToken || localRefreshToken === "undefined") {
      setLocalRefreshToken(refresh_token);
    }

    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if (!localAccessToken || localAccessToken === "undefined") {
      setLocalAccessToken(access_token);
      return access_token;
    }

    return localAccessToken;
  }
  return null;
};

export const token: any = getAccessToken();

// TODO: Need to be updated!!!
export const logout = () => {
  window.localStorage.removeItem("spotify_token_timestamp");
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.location.reload();
};

// ––––––––––––––––––––––––––––––––––– API CALLS ––––––––––––––––––––––––––––––––––––––––

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
  });

export const useGetRecentlyPlayed = () => {
  const [playHistory, setPlayHistory] = useState<playHistoryResponse | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers,
      })
      .then((a) => {
        if (!unmounted) {
          setPlayHistory(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a users track history - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, []);

  return { playHistory, loading, error, errorMessage };
};

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    {
      headers,
    }
  );
export const getTopArtistsMedium = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    {
      headers,
    }
  );

/**
 * Returns a users top artists for a given time range.
 * The function takes an enum as its parameter;
 * 1 equals short term (14 days), 2 equals medium term (2 months)
 * and 3 equals long term (all time). If no time range is provided
 * then the function defaults to short term.
 * @implements https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 * @param timeRange
 */
export const useGetTopArtists = (timeRange: 1 | 2 | 3 = 1) => {
  const [artists, setArtists] = useState<fullArtistObject[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let term: string = "short_term";
  timeRange === 1
    ? null
    : timeRange === 2
    ? (term = "medium_term")
    : (term = "long_term");
  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${term}`,
        { headers, cancelToken: source.token }
      )
      .then((a) => {
        if (!unmounted) {
          const pagingObject: pagingObject = a.data;
          setArtists(pagingObject.items as fullArtistObject[]);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a the users top artists - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, []);

  return { artists, loading, error, errorMessage };
};

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    { headers }
  );
export const getTopTracksMedium = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    {
      headers,
    }
  );
export const getTopTracksLong = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    { headers }
  );

/**
 * Returns a users top tracks for a given time range.
 * The function takes an enum as its parameter;
 * 1 equals short term (14 days), 2 equals medium term (2 months)
 * and 3 equals long term (all time). If no time range is provided
 * then the function defaults to short term.
 * @implements https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 * @param timeRange
 */
export const useGetTopTracks = (timeRange: 1 | 2 | 3 = 1) => {
  const [tracks, setTracks] = useState<fullTrackObject[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let term: string = "short_term";
  timeRange === 1
    ? null
    : timeRange === 2
    ? (term = "medium_term")
    : (term = "long_term");
  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${term}`,
        { headers, cancelToken: source.token }
      )
      .then((a) => {
        if (!unmounted) {
          const pagingObject: pagingObject = a.data;
          setTracks(pagingObject.items as fullTrackObject[]);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a the users top artists - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, []);

  return { tracks, loading, error, errorMessage };
};

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
export const getArtist = (artistId: string) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

export const useGetArtist = (artistId: string) => {
  const [artist, setArtist] = useState<fullArtistObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers,
        cancelToken: source.token,
      })
      .then((a) => {
        if (!unmounted) {
          setArtist(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a track with ID: ${artistId} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [artistId]);

  return { artist, loading, error, errorMessage };
};

/**
 * Get Several Artists
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-several-artists/
 */
export const getSeveralArtist = (artistIds: string) =>
  axios.get(`https://api.spotify.com/v1/artists?ids=${artistIds}`, { headers });

/**
 * Follow an Artist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const followArtist = (artistId: string) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: "put", url, headers });
};

/**
 * Check if Current User Follows Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowArtist = (artistId: string) =>
  axios.get(
    `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
    {
      headers,
    }
  );

export const getArtistTopTracks = (artistId: string) =>
  axios.get(
    `	https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=dk`,
    {
      headers,
    }
  );

/**
 * Check if Users Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowPlaylist = (playlistId: string, userId: string) =>
  axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`,
    {
      headers,
    }
  );

/**
 * Create a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
 */
export const createPlaylist = (userId: string, name: string) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: "post", url, headers, data });
};

/**
 * Add Tracks to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = (playlistId: string, uris: string) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: "post", url, headers });
};

/**
 * Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
export const followPlaylist = (playlistId: string) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  return axios({ method: "put", url, headers });
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = (playlistId: string) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

export const useGetPlaylist = (playlistId: string) => {
  const [playlist, setPlaylist] = useState<fullPlaylistObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers,
        cancelToken: source.token,
      })
      .then((a) => {
        if (!unmounted) {
          setPlaylist(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a playlist with ID: ${playlistId} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [playlistId]);

  return { playlist, loading, error, errorMessage };
};

export const useGetAlbum = (albumId: string) => {
  const [album, setAlbum] = useState<fullAlbumObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers,
        cancelToken: source.token,
      })
      .then((a) => {
        if (!unmounted) {
          setAlbum(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving an album with ID: ${albumId} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [albumId]);

  return { album, loading, error, errorMessage };
};

export const useGetAlbumTracks = (albumId: string) => {
  const [tracks, setTracks] = useState<simplifiedTrackObject[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers,
        cancelToken: source.token,
      })
      .then((a) => {
        if (!unmounted) {
          setTracks(a.data.items);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving an album with ID: ${albumId} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [albumId]);

  return { tracks, loading, error, errorMessage };
};

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
export const getPlaylistTracks = (playlistId: string) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers,
  });

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks: any[]) =>
  tracks.map(({ track }) => track.id).join(",");

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
export const getAudioFeaturesForTracks = (tracks: any[]) => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
    headers,
  });
};

/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
export const getRecommendationsForTracks = (tracks: any) => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
  const seed_artists = "";
  const seed_genres = "";

  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
    {
      headers,
    }
  );
};

export const useGetRecommendationsForTracks = (
  tracks: simplifiedTrackObject[] | fullTrackObject[]
) => {
  const [
    recommendationsResponse,
    setRecommendationsResponse,
  ] = useState<recommendationsResponseObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
    const seed_artists = "";
    const seed_genres = "";
    axios
      .get(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
        {
          headers,
          cancelToken: source.token,
        }
      )
      .then((a) => {
        if (!unmounted) {
          setRecommendationsResponse(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while generating reccomendations`,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, []);

  return { recommendationsResponse, loading, error, errorMessage };
};

/**
 * Returns a recommendation response containing an array of tracks and an array of seeds based on the users recent listening history.
 */
export const useGetRecommendationsForTracksOnRecents = () => {
  const [
    recommendationsResponse,
    setRecommendationsResponse,
  ] = useState<recommendationsResponseObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    let tracks: playHistoryResponse;
    axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers,
      })
      .then((r) => {
        if (!unmounted) {
          tracks = r.data;
          const shuffledTracks = tracks.items.sort(() => 0.5 - Math.random());
          const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
          const seed_artists = "";
          const seed_genres = "";
          axios
            .get(
              `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
              {
                headers,
              }
            )
            .then((a) => {
              if (!unmounted) {
                setRecommendationsResponse(a.data);
                setLoading(false);
              }
            })
            .catch(function (err: Error) {
              if (!unmounted) {
                setError(true);
                setErrorMessage(err.message);
                setLoading(false);
                if (axios.isCancel(err)) {
                  console.log(`The request was cancelled: ${err.message}`);
                } else {
                  console.log(
                    `An error has occured while generating reccomendations`,
                    err.message
                  );
                }
              }
            });
        }
      });

    return function () {
      unmounted = true;
    };
  }, []);

  return { recommendationsResponse, loading, error, errorMessage };
};

/**
 * Add an item to the end of the user's current playback queue.
 * https://developer.spotify.com/console/post-queue/
 */
export const addItemToQueue = (trackUri: string) => {};

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const getTrack = (trackId: any) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers,
  });

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const useGetTrack = (trackId: string) => {
  const [track, setTrack] = useState<fullTrackObject | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers,
        cancelToken: source.token,
      })
      .then((a) => {
        if (!unmounted) {
          setTrack(a.data);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving a track with ID: ${trackId} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [trackId]);

  return { track, loading, error, errorMessage };
};

/**
 * Play a track or several tracks, depending on whether the given parm is a string or string array.
 * https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
 */
export const playTrack = async (trackUri: string | string[]) => {
  const data = {
    uris: typeof trackUri === "string" ? [trackUri] : trackUri,
  };
  const url = `https://api.spotify.com/v1/me/player/play`;
  try {
    return axios({ method: "put", url, headers, data });
  } catch (err) {
    if (err.message) {
    } else if (err.request) {
      console.log(err.request);
    }
  }
};

/**
 * Save tracks for Current User
 * https://developer.spotify.com/console/put-current-user-saved-tracks/?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B
 */
export const saveTracks = (trackIds: string[]) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${concatIds(trackIds)}`;
  return axios({ method: "put", url, headers });
};

export const removeTracks = (trackIds: string[]) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${concatIds(trackIds)}`;
  return axios({ method: "DELETE", url, headers });
};

/**
 * Get Information About The User's Current Playback
 * https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/
 */
export const getCurrentPlayback = () =>
  axios.get(`https://api.spotify.com/v1/me/player`, {
    headers,
  });

export const useGetPlayBackWatcher = () => {
  const [playBack, setPlayBack] = useState<currentlyPlayingContext | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    const fetchPlayBack = async () => {
      axios
        .get(`https://api.spotify.com/v1/me/player`, {
          headers,
          cancelToken: source.token,
        })
        .then((a) => {
          if (!unmounted) {
            setPlayBack(a.data);
            setLoading(false);
          }
        })
        .catch(function (err: Error) {
          if (!unmounted) {
            setError(true);
            setErrorMessage(err.message);
            setLoading(false);
            if (axios.isCancel(err)) {
              console.log(`The request was cancelled: ${err.message}`);
            } else {
              console.log(
                `An error has occured while retrieving the current playback - `,
                err.message
              );
            }
          }
        });
    };
    const interval = setInterval(() => fetchPlayBack(), 5000);
    return function () {
      unmounted = true;
      clearInterval(interval);
    };
  }, []);
  return {
    playBack,
    loading,
    error,
    errorMessage,
  };
};

export const getSavedObjects = async () => {
  let savedObjects: savedInterface = { savedTracks: null, savedAlbums: null };

  const query = (url: string) => axios.get(url, { headers });
  let albumRes: pagingObject = await (
    await query(`https://api.spotify.com/v1/me/albums?offset=0&limit=50`)
  ).data;
  savedObjects.savedAlbums = albumRes.items as savedAlbumObject[];

  let trackRes: pagingObject = await (
    await query(`https://api.spotify.com/v1/me/tracks?offset=0&limit=50`)
  ).data;
  savedObjects.savedTracks = trackRes.items as savedTrackObject[];

  if (albumRes.next) {
    while (albumRes.next) {
      albumRes = await (await query(albumRes.next)).data;
      savedObjects.savedAlbums = [
        ...savedObjects.savedAlbums,
        ...(albumRes.items as savedAlbumObject[]),
      ];
    }
  }

  if (trackRes.next) {
    while (trackRes.next) {
      trackRes = await (await query(trackRes.next)).data;
      savedObjects.savedTracks = [
        ...savedObjects.savedTracks,
        ...(trackRes.items as savedTrackObject[]),
      ];
    }
  }

  return savedObjects;
};

/**
 * Transfer a User's Playback
 * https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
 */
export const transferPlayback = (deviceId: string) => {
  const url = "https://api.spotify.com/v1/me/player";
  const data = {
    device_ids: [deviceId],
  };
  return axios({ method: "put", url, headers, data: data });
};

/**
 * Pause a User's Playback
 * https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
 */
export const pausePlayback = () => {
  const url = `https://api.spotify.com/v1/me/player/pause`;
  return axios({ method: "put", url, headers });
};

/**
 * Start/Resume a User's Playback
 * https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
 */
export const startPlayback = () => {
  const url = `https://api.spotify.com/v1/me/player/play`;
  return axios({ method: "put", url, headers });
};

/**
 * Get a User's Available Devices
 * https://developer.spotify.com/documentation/web-api/reference/player/get-a-users-available-devices/
 */
export const getAvailableDevices = () =>
  axios.get(`https://api.spotify.com/v1/me/player/devices`, {
    headers,
  });

/**
 * Get Audio Analysis for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
export const getTrackAudioAnalysis = (trackId: any) =>
  axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
    headers,
  });

/**
 * Get Audio Features for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
export const getTrackAudioFeatures = (trackId: any) =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers,
  });

export const getUserInfo = () => {
  return axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      // useGetTopArtists(3),
      getTopTracksLong(),
    ])
    .then(
      axios.spread(
        (user, followedArtists, playlists, topArtists, topTracks) => {
          return {
            user: user.data,
            followedArtists: followedArtists.data,
            playlists: playlists.data,
            topArtists: topArtists.data,
            topTracks: topTracks.data,
          };
        }
      )
    );
};

export const getTrackInfo = (trackId: any) => {
  return axios
    .all([
      getTrack(trackId),
      getTrackAudioAnalysis(trackId),
      getTrackAudioFeatures(trackId),
    ])
    .then(
      axios.spread((track, audioAnalysis, audioFeatures) => {
        return {
          track: track.data,
          audioAnalysis: audioAnalysis.data,
          audioFeatures: audioFeatures.data,
        };
      })
    );
};

export const topSearchResultsArtists = (query: string) =>
  axios.get(`https://api.spotify.com/v1/search?${query}&type=artist&limit=7`, {
    headers,
  });

export const topSearchResultsTracks = (query: string) =>
  axios.get(`https://api.spotify.com/v1/search?${query}&type=track&limit=7`, {
    headers,
  });

export const useGetTopResults = (query: string) => {
  const [topTracks, setTracks] = useState<fullTrackObject[] | null>(null);
  const [topArtists, setArtists] = useState<fullArtistObject[] | null>(null);
  const [topAlbums, setAlbums] = useState<simplifiedAlbumObject[] | null>(null);
  const [topPlaylists, setPlaylists] = useState<
    simplifiedPlaylistObject[] | null
  >(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    if (query === "") return;
    axios
      .get(
        `https://api.spotify.com/v1/search?${query}&type=track%2Cartist%2Calbum%2Cplaylist&limit=8`,
        {
          headers,
          cancelToken: source.token,
        }
      )
      .then((a) => {
        if (!unmounted) {
          const { albums, artists, tracks, playlists } = a.data;
          setAlbums(albums.items as simplifiedAlbumObject[]);
          setTracks(tracks.items as fullTrackObject[]);
          setPlaylists(playlists.items as simplifiedPlaylistObject[]);
          setArtists(artists.items as fullArtistObject[]);
          setLoading(false);
        }
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving search results based on query: ${query} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [query]);

  return {
    topTracks,
    topArtists,
    topPlaylists,
    topAlbums,
    loading,
    error,
    errorMessage,
  };
};

export const getAllSearchResultsTracks = (query: string, offset?: number) =>
  axios.get(
    `https://api.spotify.com/v1/search?${query}&type=track&limit=50${
      offset ? `&offset=${offset}` : ""
    }`,
    { headers }
  );

/**
 * Returns all search results for a given query.
 * @param query
 * @param type
 * @param offset
 */
export const useGetAllSearchResults = (
  query: string,
  type: "tracks" | "artists" | "albums" | "playlists",
  offset: number = 0
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<
    | fullTrackObject[]
    | fullArtistObject[]
    | simplifiedAlbumObject[]
    | fullPlaylistObject[]
  >([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(false);
    if (query === "") return;
    const searchType = type.slice(0, -1);
    axios
      .get(
        `https://api.spotify.com/v1/search?${query}&type=${searchType}&limit=20&offset=${offset}`,
        { headers, cancelToken: source.token }
      )
      .then((a) => {
        let result;
        if (type === "tracks") result = a.data.tracks;
        if (type === "artists") result = a.data.artists;
        if (type === "albums") result = a.data.albums;
        if (type === "playlists") result = a.data.playlists;

        setSearchResults((prevResults) => {
          return [...prevResults, ...result.items];
        });
        setHasMore(result.next !== null ? true : false);
        setLoading(false);
      })
      .catch(function (err: Error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log(`The request was cancelled: ${err.message}`);
          } else {
            console.log(
              `An error has occured while retrieving search results based on query: ${query} - `,
              err.message
            );
          }
        }
      });

    return function () {
      unmounted = true;
    };
  }, [query, offset]);

  return { loading, error, errorMessage, searchResults, hasMore };
};

export const getNextTracks = (url: string) => axios.get(url, { headers });
