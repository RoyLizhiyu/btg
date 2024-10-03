import React from "react";
import { PiShuffleDuotone, PiShuffleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoop } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
const SIZE = 25;
const ShuffleButton = () => {
  const { loop } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setLoop(false));
  };
  return (
    <Button isIconOnly>
      <PiShuffleFill
        onClick={handleClick}
        size={SIZE}
        color={loop ? "white" : "black"}
      />
    </Button>
  );
};

export default ShuffleButton;
