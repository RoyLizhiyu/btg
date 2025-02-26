import React from "react";
import KeySection from "./key-section";
import GenreSection from "./genre-section";
import TempoSection from "./tempo-section";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";

const TrackSettings = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <div className="flex flex-col items-center p-8 gap-7 mb-10">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">BTG</p>
          <small className="text-default-500">
            Play along with your guitar or piano. Enjoy!
          </small>
          <small className="text-default-500">- Zhiyu</small>
          <h4 className="font-bold text-large"> A Random Music Generator</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={"/IMG_6190.jpg"}
            width={270}
            height={270}
          />
        </CardBody>
      </Card>
      <KeySection isFetching={isFetching} />
      <GenreSection isFetching={isFetching} />
      <TempoSection isFetching={isFetching} />
    </div>
  );
};

export default TrackSettings;
