import React from "react";
import { PiShuffleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoop } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
const SIZE = 35;
const ShuffleButton = () => {
  const { loop } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setLoop(false));
  };
  return (
    <Button isIconOnly className="w-16 h-16" onClick={handleClick}>
      <PiShuffleFill size={SIZE} color={loop ? "white" : "black"} />
    </Button>
  );
};

export default ShuffleButton;
