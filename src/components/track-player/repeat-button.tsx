import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { PiRepeatBold, PiRepeatDuotone } from "react-icons/pi";
import { setLoop } from "@/lib/store/audioSlice";
const RepeatButton = () => {
  const { loop } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(setLoop(true));
  return (
    <button>
      {loop ? (
        <PiRepeatDuotone onClick={handleClick} />
      ) : (
        <PiRepeatBold onClick={handleClick} />
      )}
    </button>
  );
};

export default RepeatButton;
