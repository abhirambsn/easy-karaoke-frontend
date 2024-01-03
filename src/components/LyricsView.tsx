import { ScrollArea } from "./ui/scroll-area";

type Props = {
  lyrics: string;
};

const LyricsView = ({ lyrics }: Props) => {
  return (
    <ScrollArea className="p-3 h-full whitespace-pre-line">
      <h3 className="text-5xl font-semibold mb-1">Lyrics</h3>
      <hr className="my-4 border-t-[0.1px] border-gray-300" />
      <p>{lyrics}</p>
    </ScrollArea>
  );
};

export default LyricsView;
