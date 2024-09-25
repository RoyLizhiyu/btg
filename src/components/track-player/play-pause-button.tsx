import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPlaying } from "@/lib/store/audioSlice";
import React from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

const PlayPauseButton = () => {
  const playing = useAppSelector((s) => s.audio.playing);
  const dispatch = useAppDispatch();
  const flipPlayButton = () => dispatch(setPlaying(!playing));
  return (
    <button>
      {playing ? (
        <FaCirclePause onClick={flipPlayButton} />
      ) : (
        <FaCirclePlay onClick={flipPlayButton} />
      )}
    </button>
  );
};

export default PlayPauseButton;
