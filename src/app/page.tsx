"use client";
import React from "react";
import TrackPlayer from "@/components/track-player";
import TrackSettings from "@/components/track-settings";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { GENRE_COLOR_MAP, KEY_COLOR_MAP } from "@/constants";
import chroma from "chroma-js";

export default function Home() {
  const [fetchTrack, { isFetching }] = useLazySearchTracksQuery();
  const primaryBackgroundColor = useMotionValue("102 65 169");
  const secondaryBackgroundColor = useMotionValue("165 148 179");
  const background = useMotionTemplate`linear-gradient(to bottom, rgb(${primaryBackgroundColor}), rgb(${secondaryBackgroundColor}))`;

  const { key, genre, bpm } = useAppSelector((s) => s.trackMeta);

  React.useEffect(() => {
    const keyColor = KEY_COLOR_MAP[key];
    const genreColor = GENRE_COLOR_MAP[genre];
    animate(primaryBackgroundColor, chroma(keyColor).rgb().join(" "), {
      duration: 1,
    });
    animate(secondaryBackgroundColor, chroma(genreColor).rgb().join(" "), {
      duration: 1,
    });
  }, [key, genre, bpm, primaryBackgroundColor, secondaryBackgroundColor]);
  return (
    <motion.div className="min-h-screen" style={{ background }}>
      <TrackSettings isFetching={isFetching} />
      <TrackPlayer isFetching={isFetching} fetchTrack={fetchTrack} />
      <div className="flex flex-row justify-center">
        <footer>
          <p className="text-center">BTG - Backing Track Generator</p>
          <p className="text-center">
            Copyright ⓒ{" "}
            <a
              href="https://github.com/RoyLizhiyu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Zhiyu Li
            </a>{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
