import React from "react";
import { Slider, SliderValue } from "@nextui-org/slider";
import ReactHowler from "react-howler";
import { useAppSelector } from "@/lib/hooks";

const ProgressBar = ({
  seek,
  setSeek,
  duration,
  setIsSeeking,
  howlerRef,
}: {
  seek: number;
  setSeek: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  howlerRef: React.RefObject<ReactHowler>;
}) => {
  const { audioUrl } = useAppSelector((s) => s.audio);
  const handleSeekingChange = (value: SliderValue) => {
    if (audioUrl && typeof value === "number") {
      setSeek(value);
      setIsSeeking(true);
    }
  };
  const handleMouseUpSeek = (value: SliderValue) => {
    if (typeof value === "number") {
      if (howlerRef.current) {
        howlerRef.current.seek(value);
      }
      setIsSeeking(false);
    }
  };

  return (
    <Slider
      aria-label="progress-bar"
      size="md"
      color="success"
      step={0.01}
      maxValue={duration}
      minValue={0}
      disableThumbScale
      value={seek}
      startContent={new Date(seek * 1000).toISOString().substring(14, 19)}
      endContent={new Date(duration * 1000).toISOString().substring(14, 19)}
      onChange={handleSeekingChange}
      onChangeEnd={handleMouseUpSeek}
    />
  );
};

export default ProgressBar;
