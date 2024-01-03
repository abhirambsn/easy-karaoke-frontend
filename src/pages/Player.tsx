import { currentTrack } from "@/atoms/trackAtom";
import { trackColor } from "@/atoms/trackColorAtom";
import AudioPlayer from "@/components/AudioPlayer";
import LyricsView from "@/components/LyricsView";
import SongNotFound from "@/components/SongNotFound";
import { Button } from "@/components/ui/button";
import { getKaraokeUrl } from "@/lib/functions";
import { shuffle } from "lodash";
import { ArrowLeft } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";

const colors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
];

const Player = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentTrackData = useRecoilValue(currentTrack);
  const [audioUrl, setAudioUrl] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement>();
  const [color, setColor] = useRecoilState(trackColor);
  const location = useLocation();

  useLayoutEffect(() => {
    if (!currentTrackData) return;
    setColor(shuffle(colors).pop() as string);
  }, [currentTrackData, setColor]);

  useLayoutEffect(() => {
    if (!currentTrackData) {
      navigate("/");
      return;
    }
    (async () => {
      const data = await getKaraokeUrl(currentTrackData.id);
      if (!data) {
        setError("Karaoke not found");
        return;
      }

      const url = data[0];
      const lyrics = data[1];
      setLyrics(lyrics);
      setAudioUrl(url);
    })();
  }, [location, currentTrackData, navigate]);
  return (
    <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
      {error ? (
        <div className="h-screen w-full flex flex-col items-center justify-center flex-1">
          <SongNotFound song_id={currentTrackData.id} message={error} />
        </div>
      ) : (
        <>
          {/* Player */}
          <section className="flex-1 flex flex-col gap-2 items-center justify-center h-screen w-full my-10 lg:my-0">
            <header className="absolute left-8 top-5">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Button>
            </header>
            <img
              src={currentTrackData?.image_url}
              alt={currentTrackData.name}
              className="h-80 w-80 rounded-lg"
            />
            <h6 className="font-bold text-4xl">{currentTrackData.name}</h6>
            <h6 className="text-xl font-medium">{currentTrackData.album}</h6>
            <h6 className="text font-light">{currentTrackData.artist}</h6>

            {/* Audio Player */}
            <AudioPlayer audio_url={audioUrl} audioRef={audioRef} />
          </section>
          {/* Lyrics */}
          <section
            className={`flex-1 h-screen w-full ${color} whitespace-pre-line`}
          >
            <LyricsView lyrics={lyrics} />
          </section>
        </>
      )}
    </div>
  );
};

export default Player;
