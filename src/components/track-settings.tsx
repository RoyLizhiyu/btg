import React from "react";
import KeySection from "./key-section";
import GenreSection from "./genre-section";
import TempoSection from "./tempo-section";

const TrackSettings = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <div>
      <KeySection isFetching={isFetching} />
      <GenreSection isFetching={isFetching} />
      <TempoSection isFetching={isFetching} />
    </div>
  );
};

export default TrackSettings;
