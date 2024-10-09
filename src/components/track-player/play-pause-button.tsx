import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPlaying } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
import React from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
const SIZE = 35;
const PlayPauseButton = () => {
  const { playing, audioUrl } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const flipPlayButton = () => dispatch(setPlaying(!playing));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSpaceBar = (event: { code: string }) => {
    if (audioUrl && event.code == "Space") {
      dispatch(setPlaying(!playing));
    }
  };
  React.useEffect(() => {
    window.addEventListener("keyup", handleSpaceBar);

    return () => window.removeEventListener("keyup", handleSpaceBar);
  }, [playing, audioUrl, handleSpaceBar]);
  return (
    <Button isIconOnly className="w-16 h-16" onClick={flipPlayButton}>
      {playing ? <FaCirclePause size={SIZE} /> : <FaCirclePlay size={SIZE} />}
    </Button>
  );
};

export default PlayPauseButton;
