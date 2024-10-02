"use client";
import SubmitButton from "@/components/submit-button";
import TrackPlayer from "@/components/track-player";
import TrackSettings from "@/components/track-settings";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import Image from "next/image";

export default function Home() {
  const [fetchTrack, { isFetching }] = useLazySearchTracksQuery();
  return (
    <>
      <TrackSettings isFetching={isFetching} />
      <SubmitButton fetchTrack={fetchTrack} isFetching={isFetching} />
      <TrackPlayer />
    </>
  );
}
