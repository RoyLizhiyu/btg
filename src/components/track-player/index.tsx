"use client";
import { useAppDispatch, useAppSelector, useFetchTrack } from "@/lib/hooks";
import { setAudioUrl, setPlaying } from "@/lib/store/audioSlice";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import ReactHowler from "react-howler";
import PlayPauseButton from "./play-pause-button";
import ShuffleButton from "./shuffle-button";
import RepeatButton from "./repeat-button";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Slider, SliderValue } from "@nextui-org/slider";

const TrackPlayer = () => {
  const { audioUrl, playing, loop } = useAppSelector((s) => s.audio);
  const [volume, setVolume] = React.useState(0.6);
  const [duration, setDuration] = React.useState(0); // To store the duration of the track
  const [seek, setSeek] = React.useState(0); // Current seek position
  const [isSeeking, setIsSeeking] = React.useState(false);
  const dispatch = useAppDispatch();
  const howlerRef = React.useRef<ReactHowler>(null);
  const { key, genre, bpm } = useAppSelector((state) => state.trackMeta);
  const { fetch } = useFetchTrack();
  const handleSeekingChange = (value: SliderValue) => {
    if (typeof value === "number") {
      setSeek(value);
      setIsSeeking(true);
    }
  };
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
  const handleMouseUpSeek = (value: SliderValue) => {
    if (typeof value === "number") {
      if (howlerRef.current) {
        howlerRef.current.seek(value);
      }
      setIsSeeking(false);
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
        <div>
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
        </div>
      )}
      <ButtonGroup fullWidth color="danger">
        <ShuffleButton />
        <PlayPauseButton />
        <RepeatButton />
      </ButtonGroup>
      <Slider
        aria-label="progress-bar"
        size="md"
        color="success"
        step={0.01}
        maxValue={duration}
        minValue={0}
        value={seek}
        startContent={new Date(seek * 1000).toISOString().substring(14, 19)}
        endContent={new Date(duration * 1000).toISOString().substring(14, 19)}
        onChange={handleSeekingChange}
        onChangeEnd={handleMouseUpSeek}
      />
      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
        <Slider
          aria-label="Volume"
          size="sm"
          color="success"
          value={volume * 100}
          onChange={(value: SliderValue) => {
            console.log(value);
            if (typeof value === "number") setVolume(value / 100);
          }}
          className="max-w-md"
        />
      </div>
    </>
  );
};

export default TrackPlayer;
