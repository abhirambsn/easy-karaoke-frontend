import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  PLAYLISTS_ENDPOINT,
  TRACKS_ENDPOINT,
  PROFILE_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  KARAOKE_BASE_ENDPOINT,
} from "./constants";

export const getPlaylists = async (token: string): Promise<Playlists> => {
  try {
    const response = await axios.get(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // @ts-expect-error full type is very large hence we are only using a subset of it
    return response.data?.items.map((item) => {
      const image = item?.images;
      let image_url = "";
      if (image.length === 0) {
        image_url = "https://via.placeholder.com/150";
      } else {
        image_url = item?.images[0].url;
      }
      return {
        id: item.id,
        name: item.name,
        image_url: image_url,
        num_tracks: item.tracks.total,
      };
    }) satisfies Playlists;
  } catch (err) {
    console.error(err);
    return [] satisfies Playlists;
  }
};

export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await axios.get(PROFILE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data?.images.length === 0) {
    return {
      image_url: "https://via.placeholder.com/150",
      name: response.data?.display_name,
    } satisfies UserProfile;
  }

  return {
    image_url: response.data?.images[0]?.url,
    name: response.data?.display_name,
  } satisfies UserProfile;
};

export const getPlaylistTracks = async (
  token: string,
  playlistId: string
): Promise<Tracks> => {
  if (playlistId === "" || token === "") {
    return [] satisfies Tracks;
  }
  try {
    const response = await axios.get(`${TRACKS_ENDPOINT}${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // @ts-expect-error full type is very large hence we are only using a subset of it
    return response.data?.items.map((item) => {
      let image_url = "";
      if (item.track?.album.images.length === 0) {
        image_url = "https://via.placeholder.com/150";
      } else {
        image_url = item.track.album.images[0].url;
      }
      return {
        album: item.track.album.name,
        artist: item.track.artists[0].name,
        id: item.track.id,
        image_url: image_url,
        name: item.track.name,
      };
    }) satisfies Tracks;
  } catch (err) {
    console.error(err);
    return [] satisfies Tracks;
  }
};

export const getTokens = async (code: string): Promise<string[]> => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      },
    }
  );
  return [
    response.data.access_token as string,
    response.data.refresh_token as string,
  ];
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return;
  }

  console.log("refreshing access token");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      },
    }
  );

  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
  return response.data.access_token;
};

axios.interceptors.response.use(null, async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const newAccessToken = await refreshAccessToken();
    const newRequest = error.config as InternalAxiosRequestConfig;

    newRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return axios(newRequest);
  }

  return Promise.reject(error);
});

export const getKaraokeUrl = async (
  trackId: string
): Promise<string[] | null> => {
  try {
    const response = await axios.get(
      `${KARAOKE_BASE_ENDPOINT}/song/${trackId}`,
      {
        headers: {
          Authorization: `Bearer 1a2b3c`,
        },
      }
    );
    if (response.status === 201) {
      console.warn("karaoke url not ready yet");
      return null;
    }
    return [
      response.data?.karaoke_file_url as string,
      response.data?.lyrics as string,
    ];
  } catch (error) {
    console.error("error getting karaoke url", error);
    return null;
  }
};
