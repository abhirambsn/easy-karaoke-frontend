export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = "code";
export const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
export const SCOPES =
  "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";
export const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}`;

export const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
export const TRACKS_ENDPOINT = "https://api.spotify.com/v1/playlists/";
export const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

export const KARAOKE_BASE_ENDPOINT = import.meta.env.VITE_API_URL;
export const GET_SONG_URL = `${KARAOKE_BASE_ENDPOINT}/song/`;
export const REQUEST_SONG_URL = `${KARAOKE_BASE_ENDPOINT}/song/request/`;
