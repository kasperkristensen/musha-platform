import {
  fullTrackObject,
  simplifiedTrackObject,
} from "../types/spotify/objectInterfaces";

export function roundFollowers(followers: number) {
  if (followers >= 1000000) {
    return `${Math.floor(followers / 1000000)}M Followers`;
  } else {
    return `${Math.floor(followers / 1000)}K Followers`;
  }
}

export function concatArtists(artists: any[]) {
  if (artists.length === 1) {
    return artists[0].name;
  }

  var i: number;
  var artistsString = artists[0].name;

  for (i = 1; i < artists.length; i++) {
    artistsString = artistsString.concat(`, ${artists[i].name}`);
  }

  return artistsString;
}

export function millisToMinutesAndSeconds(inputMs: number) {
  const minutes = Math.floor(inputMs / 60000);
  const seconds = parseInt(((inputMs % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export const getUris = (
  tracks: fullTrackObject[] | simplifiedTrackObject[]
) => {
  let uris: string[] = [];
  for (let i = 0; i < tracks.length; i++) {
    uris.push(tracks[i].uri);
  }
  return uris;
};
