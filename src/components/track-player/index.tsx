"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import ReactHowler from "react-howler";
const TrackPlayer = () => {
  const audioUrl = useAppSelector((s) => s.audio.audioUrl);
  console.log({ audioUrl });
  return (
    <div>
      <audio controls src={audioUrl} autoPlay></audio>
    </div>
  );
};

export default TrackPlayer;
