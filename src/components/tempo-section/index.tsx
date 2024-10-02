"use client";
import { BPM, GENRES } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Bpm, Genre } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBpm } from "@/lib/store/trackMetaSlice";
const TempoSection = ({ isFetching }: { isFetching: boolean }) => {
  const { bpm } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Tabs
        variant="bordered"
        size="md"
        selectedKey={bpm}
        onSelectionChange={(e) => dispatch(setBpm(e as Bpm))}
        color="secondary"
        aria-label="BPM"
        classNames={{
          tabList: "grid grid-cols-3 gap-4",
        }}
        disabledKeys={
          isFetching ? BPM.filter((filterBpm) => filterBpm !== bpm) : []
        }
      >
        {BPM.map((bpm) => (
          <Tab key={bpm} title={messages[bpm as Bpm].defaultMessage} />
        ))}
      </Tabs>
    </div>
  );
};

export default TempoSection;
