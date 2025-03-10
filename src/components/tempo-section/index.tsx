"use client";
import { BPM } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Bpm } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBpm } from "@/lib/store/trackMetaSlice";
import { Chip } from "@nextui-org/chip";

const TempoSection = ({ isFetching }: { isFetching: boolean }) => {
  const { bpm } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-6">
      <Chip
        size="lg"
        className="p-6 bg-neutral-900"
        variant="shadow"
        radius="sm"
      >
        <p className="text-2xl font-semibold text-white">Pick a BPM</p>
      </Chip>
      <Tabs
        variant="solid"
        size="lg"
        selectedKey={bpm}
        onSelectionChange={(e) => dispatch(setBpm(e as Bpm))}
        color="success"
        aria-label="BPM"
        classNames={{
          tabList: "grid grid-cols-3 gap-12 p-3 bg-black shadow-custom",
          tab: "p-3",
        }}
        disabledKeys={
          isFetching ? BPM.filter((filterBpm) => filterBpm !== bpm) : []
        }
      >
        {BPM.map((bpm) => (
          <Tab
            key={bpm}
            title={
              <p className="text-md text-white">
                {messages[bpm as Bpm].defaultMessage}
              </p>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default TempoSection;
