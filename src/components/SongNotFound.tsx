import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { REQUEST_SONG_URL } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  song_id: string;
  message: string;
};

const SongNotFound = ({ song_id, message }: Props) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const requestSong = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        REQUEST_SONG_URL,
        { song_id },
        { headers: { Authorization: `Bearer 1a2b3c` } }
      );
      console.log(response.data);
      toast.success("Song requested successfully", { duration: 5000 });
      setSubmitting(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(<p>err</p>, { duration: 5000 });
      setSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{message}</CardTitle>
        <CardDescription>
          <p>
            Sorry, we couldn't find the karaoke version of song with the id of{" "}
            <strong>{song_id}</strong>.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          You can either request a new song or go back and select another song.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={submitting}
          onClick={() => navigate("/")}
          variant="outline"
        >
          Back
        </Button>
        <Button disabled={submitting} onClick={requestSong}>
          Request Song
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SongNotFound;
