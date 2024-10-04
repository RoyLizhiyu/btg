"use client";
import { GENRES } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Genre } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setGenre } from "@/lib/store/trackMetaSlice";
import { Chip } from "@nextui-org/chip";

const GenreSection = ({ isFetching }: { isFetching: boolean }) => {
  const { genre } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-6">
      <Chip size="lg" className="p-6" variant="faded">
        <p className="text-2xl font-semibold">Pick a Genre</p>
      </Chip>
      <Tabs
        variant="solid"
        size="lg"
        selectedKey={genre}
        onSelectionChange={(e) => dispatch(setGenre(e as Genre))}
        color="secondary"
        aria-label="Genre"
        classNames={{
          tabList: "grid grid-cols-4 gap-12 p-3",
          tab: "p-3",
        }}
        disabledKeys={
          isFetching
            ? GENRES.filter((filterGenre) => filterGenre !== genre)
            : []
        }
      >
        {GENRES.map((genre) => (
          <Tab
            key={genre}
            title={
              <p className="text-lg">
                {messages[genre as Genre].defaultMessage}
              </p>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default GenreSection;
