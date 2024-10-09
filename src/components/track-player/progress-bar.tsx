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
  const [hideThumb, setHideThumb] = React.useState(true);
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
  const handleHover = () => setHideThumb(false);
  const handleLeave = () => setHideThumb(true);

  return (
    <Slider
      className="w-4/5"
      classNames={{
        startContent: "max-w-10 w-10 p-2 text-white",
        endContent: "text-white",
        trackWrapper: "gap-4",
      }}
      aria-label="progress-bar"
      size="md"
      hideThumb={hideThumb}
      color="success"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      step={0.01}
      maxValue={duration}
      minValue={0}
      disableThumbScale
      value={seek}
      startContent={
        seek ? new Date(seek * 1000).toISOString().substring(14, 19) : "0:00"
      }
      endContent={
        duration
          ? new Date(duration * 1000).toISOString().substring(14, 19)
          : ""
      }
      onChange={handleSeekingChange}
      onChangeEnd={handleMouseUpSeek}
    />
  );
};

export default ProgressBar;
