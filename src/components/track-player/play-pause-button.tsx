import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPlaying } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
import React from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
const SIZE = 25;
const PlayPauseButton = () => {
  const playing = useAppSelector((s) => s.audio.playing);
  const dispatch = useAppDispatch();
  const flipPlayButton = () => dispatch(setPlaying(!playing));
  return (
    <Button isIconOnly>
      {playing ? (
        <FaCirclePause onClick={flipPlayButton} size={SIZE} />
      ) : (
        <FaCirclePlay onClick={flipPlayButton} size={SIZE} />
      )}
    </Button>
  );
};

export default PlayPauseButton;
