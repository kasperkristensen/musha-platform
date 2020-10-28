import axios from "axios";
import { useEffect } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
  useUserQuery,
} from "../generated/graphql";
import { getHashParams } from "../utils/getHashParams";

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
export const getTopArtistsLong = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    { headers }
  );

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
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
export const getArtist = (artistId: string) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

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
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

/**
 * Play a Track
 * https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
 */
export const playTrack = (trackUri: string | string[]) => {
  const data = {
    uris: typeof trackUri === "string" ? [trackUri] : trackUri,
  };
  const url = `https://api.spotify.com/v1/me/player/play`;
  return axios({ method: "put", url, headers, data }).catch(async (err) => {
    if (err.message) {
    } else if (err.request) {
      console.log(err.request);
    }
  });
};

/**
 * Save tracks for Current User
 * https://developer.spotify.com/console/put-current-user-saved-tracks/?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B
 */
export const saveTracks = (trackIds: string[]) => {
  let ids = "";
  if (trackIds.length - 1 > 1) {
    let i = 0;
    while (i < trackIds.length) {
      ids.concat(`${trackIds[i]}%`);
      i++;
    }
    ids.concat(trackIds[i]);
  } else {
    ids = trackIds[0];
  }
  const url = `https://api.spotify.com/v1/me/tracks?ids=${ids}`;
  return axios({ method: "put", url, headers });
};

/**
 * Get Information About The User's Current Playback
 * https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/
 */
export const getCurrentPlayback = () =>
  axios.get(`https://api.spotify.com/v1/me/player`, {
    headers,
  });

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
      getTopArtistsLong(),
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

export const dummySearch = (searchTerm: string) =>
  axios.get(
    `https://api.spotify.com/v1/search?${searchTerm}&type=artist&limit=7`,
    {
      headers,
    }
  );

export const getSearchResults = (query: string, more: string) => {
  useEffect(() => {}, [query]);
  return null;
};
