export interface imageObject {
  height: number;
  width: number;
  url: string;
}

export interface fullAlbumObject {
  album_type: string;
  artists: simplifiedArtistObject[];
  available_markets: string[];
  copyrights: copyrightObject;
  external_ids: externalIdObject;
  external_urls: externalUrlObject;
  genres: string[];
  href: string;
  id: string;
  images: imageObject[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  tracks: pagingObject;
  type: number;
  uri: string;
}

export interface simplifiedAlbumObject {
  album_type: string;
  artists: simplifiedArtistObject[];
  available_markets: string[];
  external_urls: externalUrlObject;
  href: string;
  id: string;
  images: imageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
}

export interface fullArtistObject {
  external_urls: externalUrlObject;
  followers: followersObject;
  genres: string[];
  href: string;
  id: string;
  images: imageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface simplifiedArtistObject {}

export interface fullTrackObject {
  album: simplifiedAlbumObject;
  artists: simplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: externalIdObject;
  external_urls: externalUrlObject;
  href: string;
  id: string;
  is_local?: false;
  is_playable: boolean;
  linked_from?: linkedTrackObject;
  restrictions?: restrictionsObject;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface simplifiedTrackObject {
  artists: simplifiedArtistObject[];
  album: simplifiedAlbumObject;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: externalUrlObject;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface simplifiedPlaylistObject {
  collaborative: boolean;
  external_urls: externalUrlObject;
  href: string;
  id: string;
  images: imageObject[];
  name: string;
  owner: userObject;
  public: boolean | null;
  snapshop_id: string;
  tracks: tracksObject;
  type: string;
  uri: string;
}

export interface userObject {}

export interface tracksObject {
  href: string;
  total: number;
}

export interface externalUrlObject {
  key: string;
  value: string;
}

export interface externalIdObject {
  key: string;
  value: string;
}

export interface copyrightObject {
  text: string;
  type: string;
}

export interface pagingObject {
  href: string;
  items:
    | simplifiedTrackObject[]
    | fullTrackObject[]
    | simplifiedArtistObject[]
    | fullArtistObject[]
    | simplifiedAlbumObject[]
    | fullAlbumObject[]
    | simplifiedPlaylistObject[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface linkedTrackObject {
  external_urls: externalUrlObject;
  href: string;
  id: string;
  type: string;
  uri: string;
}

/**
 * key: reason
 * https://developer.spotify.com/documentation/web-api/reference/object-model/#album-restriction-object
 */
export interface restrictionsObject {
  reason: string;
}

export interface followersObject {
  href: string | null;
  total: number;
}

export interface serverResponse {
  fullTrackData: fullTrackObject;
}

export interface playHistoryObject {
  track: simplifiedTrackObject;
  played_at: string;
  context: contextObject;
}

export interface cursorsObject {
  after: number;
  before: number;
}

export interface playHistoryResponse {
  cursors: cursorsObject;
  href: string;
  items: playHistoryObject[];
  limit: number;
  next: string;
}

export interface contextObject {
  type: string;
  href: string;
  external_urls: externalUrlObject;
  uri: string;
}

export interface recommendationsSeedObject {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface recommendationsResponseObject {
  seeds: recommendationsSeedObject[];
  tracks: simplifiedTrackObject[];
}
