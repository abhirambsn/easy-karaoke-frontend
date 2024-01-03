import { TableCell, TableRow } from "./ui/table";

type Props = {
  s_no: number;
  image_url: string;
  name: string;
  artist: string;
  album: string;
  onClick?: () => void;
};

const TrackItem = ({
  s_no,
  image_url,
  name,
  album,
  artist,
  onClick,
}: Props) => {
  return (
    <TableRow onClick={onClick} className="hover:cursor-pointer">
      <TableCell>{s_no}</TableCell>
      <TableCell>
        <img className="h-10 w-10 rounded-xl" src={image_url} alt={name} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{album}</TableCell>
      <TableCell>{artist}</TableCell>
    </TableRow>
  );
};

export default TrackItem;
