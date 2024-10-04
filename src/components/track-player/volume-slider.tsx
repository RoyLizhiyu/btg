import React from "react";
import { Slider, SliderValue } from "@nextui-org/slider";

const VolumeSilder = ({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        aria-label="Volume"
        size="sm"
        color="success"
        value={volume * 100}
        onChange={(value: SliderValue) => {
          console.log(value);
          if (typeof value === "number") setVolume(value / 100);
        }}
        className="max-w-md"
      />
    </div>
  );
};

export default VolumeSilder;
