"use client";

import { FC } from "react";

import dynamic from "next/dynamic";

import { IconType } from "react-icons";

import { useCountries } from "~/hooks/useCountries";

import { SafeListing, SafeUser } from "~/types/user";

import Avatar from "~/components/Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("~/components/Map"), {
  ssr: false,
});

type Props = {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  listing: SafeListing;
};

const ListingInfo: FC<Props> = ({ user, category, listing }) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(listing.locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{listing.guestCount} guests</div>
          <div>{listing.roomCount} rooms</div>
          <div>{listing.bathroomCount} bathrooms</div>
        </div>

        <hr />

        {category ? <ListingCategory category={category} /> : null}

        <hr />

        <div className="text-lg font-light text-neutral-500">{listing.description}</div>
      </div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
