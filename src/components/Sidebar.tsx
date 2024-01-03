import PlaylistItem from "./PlaylistItem";

type Props = {
  playlists: Playlist[];
  setPlaylistId: (playlistId: string) => void;
  sidebarState: boolean;
};

const Sidebar = ({ playlists, setPlaylistId, sidebarState }: Props) => {
  return (
    <div
      className={`flex-col text-gray-500 min-w-80 w-full p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] ${
        sidebarState ? "inline-flex" : "hidden"
      } md:inline-flex`}
    >
      <h2 className="text-4xl text-gray-100">Easy Karaoke</h2>
      <h6 className="mt-2 text-base text-gray-300 mb-6">Playlists</h6>
      <hr className="border-t-[0.1px] border-gray-600 mb-2" />
      <div className="space-y-4">
        {playlists && playlists.map((playlist, i) => (
          <PlaylistItem
            key={i}
            name={playlist.name}
            image_url={playlist.image_url}
            num_tracks={playlist.num_tracks}
            onClick={() => setPlaylistId(playlist.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
