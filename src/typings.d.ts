type Playlist = {
    id: string;
    name: string;
    image_url: string;
    num_tracks: number;
}

type Playlists = Playlist[];

type Track = {
    id: string;
    name: string;
    artist: string;
    album: string;
    image_url: string;
    audio_url?: string;
    lyrics?: string;
}

type Tracks = Track[];

type UserProfile = {
    name: string;
    image_url: string;
}