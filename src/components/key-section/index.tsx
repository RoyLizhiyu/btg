"use client";
import { KEYS, KEYS_MAP } from "@/constants";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Key } from "@/types";
import messages from "@/messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setKey } from "@/lib/store/trackMetaSlice";
import {
  searchTracksApi,
  useSearchTracksQuery,
} from "@/services/searchTracksApi";
const KeySection = ({ isFetching }: { isFetching: boolean }) => {
  const { key } = useAppSelector((state) => state.trackMeta);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Tabs
        variant="bordered"
        size="md"
        selectedKey={key}
        onSelectionChange={(e) => dispatch(setKey(e as Key))}
        color="secondary"
        disabledKeys={
          isFetching ? KEYS.filter((filterKey) => filterKey !== key) : []
        }
        aria-label="Key"
        classNames={{
          tabList: "grid grid-cols-4 gap-4",
        }}
      >
        {KEYS.map((key) => (
          <Tab key={key} title={messages[key as Key].defaultMessage} />
        ))}
      </Tabs>
    </div>
  );
};

export default KeySection;
