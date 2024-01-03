import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Play, Pause, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { trackColor } from "@/atoms/trackColorAtom";
import { StopIcon } from "@radix-ui/react-icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
[
  "accent-indigo-500",
  "accent-blue-500",
  "accent-green-500",
  "accent-red-500",
  "accent-yellow-500",
  "accent-pink-500",
  "accent-purple-500",
];

type Props = {
  audio_url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audioRef: any;
};

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

const AudioPlayer = ({ audioRef, audio_url }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const color = useRecoilValue(trackColor);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value as unknown as number);
  };

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }, [audioRef]);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const startRecording = () => {
    // Request Microphone Perimissions

    setIsRecording(true);
    setIsPlaying(true);
    handlePlayPause();
  };
  const stopRecording = () => {
    setIsRecording(false);
    setIsPlaying(false);
    handlePlayPause();
  };
  const startStopRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef, handleTimeUpdate]);

  return (
    <div className="flex flex-col w-full px-20">
      <Input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className={`${color.replace("bg", "accent")}`}
      />
      <audio ref={audioRef} src={audio_url} />
      <div className="flex items-center justify-between">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button className="h-16 w-16 rounded-full" onClick={handlePlayPause}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button
          className={`h-16 w-16 hover:${
            isRecording ? "bg-red-500" : color
          } hover:opacity-80 transition-all ease-in-out duration-100 text-gray-50  rounded-full ${
            isRecording ? "bg-red-500" : color
          }`}
          onClick={startStopRecording}
        >
          {isRecording ? <StopIcon fontSize={16} /> : <Mic size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayer;
