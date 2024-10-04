import React from "react";
import KeySection from "./key-section";
import GenreSection from "./genre-section";
import TempoSection from "./tempo-section";

const TrackSettings = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <div className="flex flex-col items-center p-8 gap-7">
      <KeySection isFetching={isFetching} />
      <GenreSection isFetching={isFetching} />
      <TempoSection isFetching={isFetching} />
    </div>
  );
};

export default TrackSettings;
