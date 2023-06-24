"use client";

import { FC } from "react";

import Image from "next/image";

import { useCountries } from "~/hooks/useCountries";

import { SafeUser } from "~/types/user";

import Heading from "~/components/Heading";
import HeartButton from "~/components/HeartButton";

type Props = {
  title: string;
  locationValue: string | undefined;
  imageSrc?: string;
  id: string;
  user?: SafeUser | null;
};

const ListingHead: FC<Props> = ({ title, locationValue, imageSrc, id, user }) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue as string);

  return (
    <>
      <Heading title={title} subTitle={`${location?.region}, ${location?.label}`} />

      <div className="w full h-[60vh] overflow-hidden rounded-xl relative">
        {imageSrc ? <Image src={imageSrc} fill className="object-cover w-full" alt="Image" /> : null}

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
