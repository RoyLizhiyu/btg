import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { PiRepeatBold, PiRepeatDuotone, PiRepeatFill } from "react-icons/pi";
import { setLoop } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
const SIZE = 25;
const RepeatButton = () => {
  const { loop } = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(setLoop(true));
  return (
    <Button isIconOnly>
      <PiRepeatFill
        onClick={handleClick}
        size={SIZE}
        color={loop ? "black" : "white"}
      />
    </Button>
  );
};

export default RepeatButton;
