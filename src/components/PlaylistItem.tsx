type Props = {
  image_url: string;
  name: string;
  num_tracks: number;
  onClick?: () => void;
};

const PlaylistItem = ({ image_url, name, num_tracks, onClick }: Props) => {
  return (
    <div
      className="flex w-full rounded-lg items-center gap-2 px-4 py-1 hover:cursor-pointer hover:bg-slate-800"
      onClick={onClick}
    >
      <img className="h-16 w-16 rounded-xl" src={image_url} alt={name} />
      <p className="flex flex-col gap-1">
        <span className="text-slate-200 text-base">{name}</span>
        <span className="text-light text-slate-300 text-xs">
          {num_tracks} Songs
        </span>
      </p>
    </div>
  );
};

export default PlaylistItem;
