"use client";
import { GENRES } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Genre } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setGenre } from "@/lib/store/trackMetaSlice";

const GenreSection = ({ isFetching }: { isFetching: boolean }) => {
  const { genre } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Tabs
        variant="bordered"
        size="md"
        selectedKey={genre}
        onSelectionChange={(e) => dispatch(setGenre(e as Genre))}
        color="secondary"
        aria-label="Genre"
        classNames={{
          tabList: "grid grid-cols-4 gap-4",
        }}
        disabledKeys={
          isFetching
            ? GENRES.filter((filterGenre) => filterGenre !== genre)
            : []
        }
      >
        {GENRES.map((genre) => (
          <Tab key={genre} title={messages[genre as Genre].defaultMessage} />
        ))}
      </Tabs>
    </div>
  );
};

export default GenreSection;
