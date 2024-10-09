import React from "react";
import { Slider, SliderValue } from "@nextui-org/slider";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";

const VolumeSilder = ({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [previousVolume, setPreviousVolume] = React.useState(0);
  const handleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMuteKey = (event: { code: string }) => {
    if (event.code == "KeyM") {
      handleMute();
    }
  };
  React.useEffect(() => {
    window.addEventListener("keyup", handleMuteKey);

    return () => window.removeEventListener("keyup", handleMuteKey);
  }, [handleMuteKey, volume]);
  return (
    <div className="flex flex-row gap-2 w-1/5 h-full max-w-md items-center">
      <button>
        {volume === 0 ? (
          <MdVolumeOff size={30} onClick={handleMute} color="white" />
        ) : (
          <MdVolumeUp size={30} onClick={handleMute} color="white" />
        )}
      </button>
      <Slider
        aria-label="Volume"
        size="md"
        color="success"
        value={volume * 100}
        onChange={(value: SliderValue) => {
          if (typeof value === "number") setVolume(value / 100);
        }}
        className="max-w-md"
      />
    </div>
  );
};

export default VolumeSilder;
