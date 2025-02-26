"use client";
import { useAppDispatch, useAppSelector, useFetchTrack } from "@/lib/hooks";
import { setPlaying } from "@/lib/store/audioSlice";
import React from "react";
import ReactHowler from "react-howler";
import PlayPauseButton from "./play-pause-button";
import ShuffleButton from "./shuffle-button";
import RepeatButton from "./repeat-button";
import { ButtonGroup } from "@nextui-org/button";
import ProgressBar from "./progress-bar";
import VolumeSilder from "./volume-slider";
import SubmitButton from "../submit-button";
import FeelingLuckyButton from "../feeling-lucky-button";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import { Card } from "@nextui-org/card";

const TrackPlayer = ({
  isFetching,
  fetchTrack,
}: {
  isFetching: boolean;
  fetchTrack: ReturnType<typeof useLazySearchTracksQuery>[0];
}) => {
  const { audioUrl, playing, loop } = useAppSelector((s) => s.audio);
  const [volume, setVolume] = React.useState(0.6);
  const [duration, setDuration] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [seek, setSeek] = React.useState(0);
  const dispatch = useAppDispatch();
  const howlerRef = React.useRef<ReactHowler>(null);
  const { key, genre, bpm } = useAppSelector((state) => state.trackMeta);
  const { fetch } = useFetchTrack();
  const loopRef = React.useRef(loop);
  const keyRef = React.useRef(key);
  const genreRef = React.useRef(genre);
  const bpmRef = React.useRef(bpm);
  React.useEffect(() => {
    loopRef.current = loop;
    keyRef.current = key;
    genreRef.current = genre;
    bpmRef.current = bpm;
  }, [bpm, genre, key, loop]);

  const handleLoad = () => {
    dispatch(setPlaying(true));
    setSeek(0);
    if (howlerRef.current) {
      setDuration(howlerRef.current.duration());
    }
  };

  React.useEffect(() => {
    if (howlerRef.current && playing) {
      const interval = setInterval(() => {
        if (!isSeeking) {
          setSeek(howlerRef.current?.seek() || 0); // Update seek position if not manually seeking
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing, isSeeking]);
  return (
    <>
      {audioUrl && (
        <ReactHowler
          src={audioUrl}
          playing={playing}
          format="mp3"
          volume={volume}
          onEnd={() => {
            if (loopRef.current) {
              setSeek(0);
            } else {
              dispatch(setPlaying(false));
              fetch({
                propKey: keyRef.current,
                propBpm: bpmRef.current,
                propGenre: genreRef.current,
              });
            }
          }}
          ref={howlerRef}
          onLoad={handleLoad}
        />
      )}
      <div className="fixed bottom-0 z-50 w-full bg-neutral-900/80 p-4 sm:p-6 md:px-16">
        <div className="flex items-center justify-center  gap-4 p-4 sm:p-8 md:px-16">
          <SubmitButton fetchTrack={fetchTrack} isFetching={isFetching} />
          <FeelingLuckyButton fetchTrack={fetchTrack} isFetching={isFetching} />
        </div>
        <div className="flex items-center justify-center gap-4 p-4 sm:p-8 md:px-16">
          <ButtonGroup
            color="danger"
            variant="shadow"
            className="w-3/5 max-w-[300px] w-full"
            isDisabled={!audioUrl}
          >
            <ShuffleButton />
            <PlayPauseButton />
            <RepeatButton />
          </ButtonGroup>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-8 md:px-16">
        <Card
          fullWidth
          shadow="lg"
          classNames={{
            base: "bg-black",
          }}
        >
          <div className="flex items-center p-2 px-4 gap-5">
            <ProgressBar
              seek={seek}
              setSeek={setSeek}
              duration={duration}
              setIsSeeking={setIsSeeking}
              howlerRef={howlerRef}
            />
            <VolumeSilder volume={volume} setVolume={setVolume} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default TrackPlayer;
