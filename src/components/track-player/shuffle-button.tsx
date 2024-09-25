import React from "react";
import { PiShuffleDuotone, PiShuffleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoop } from "@/lib/store/audioSlice";
const ShuffleButton = () => {
  const { loop } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setLoop(false));
  };
  return (
    <button>
      {loop ? (
        <PiShuffleFill onClick={handleClick} />
      ) : (
        <PiShuffleDuotone onClick={handleClick} />
      )}
    </button>
  );
};

export default ShuffleButton;
