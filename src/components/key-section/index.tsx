"use client";
import { KEYS } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Key } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setKey } from "@/lib/store/trackMetaSlice";
import { Chip } from "@nextui-org/chip";

const KeySection = ({ isFetching }: { isFetching: boolean }) => {
  const { key } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    dispatch(setKey(e as Key));
  };
  return (
    <div className="flex flex-col items-center gap-6">
      <Chip
        size="lg"
        className="p-6 bg-neutral-200"
        variant="shadow"
        radius="sm"
      >
        <p className="text-2xl font-semibold">Pick a Key</p>
      </Chip>
      <Tabs
        variant="solid"
        size="lg"
        selectedKey={key}
        onSelectionChange={handleChange}
        color="success"
        disabledKeys={
          isFetching ? KEYS.filter((filterKey) => filterKey !== key) : []
        }
        aria-label="Key"
        classNames={{
          tabList: "grid grid-cols-4 gap-12 p-3 bg-black shadow-custom",
          tab: "p-3",
        }}
      >
        {KEYS.map((key) => (
          <Tab
            key={key}
            title={
              <p className="text-lg  text-white">
                {messages[key as Key].defaultMessage}
              </p>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default KeySection;
