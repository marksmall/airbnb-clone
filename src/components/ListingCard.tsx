"use client";

import { FC, useCallback, MouseEvent, useMemo } from "react";

import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { useCountries } from "~/hooks/useCountries";

import { SafeListing, SafeReservation, SafeUser } from "../types/user";

import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "./Button";

type Props = {
  listing: SafeListing;
  user?: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const DATE_FORMAT = "PP";

const ListingCard: FC<Props> = ({ listing, user, reservation, onAction, disabled, actionLabel, actionId = "" }) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, DATE_FORMAT)} - ${format(end, DATE_FORMAT)}`;
  }, [reservation]);

  return (
    <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${listing.id}`)}>
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={listing.imageSrc}
            alt="Listing"
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} user={user} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500"> {reservationDate ?? listing.category}</div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>

          {!reservation ? <div className="font-light">per night</div> : null}
        </div>

        {onAction && actionLabel ? (
          <Button small onClick={handleCancel} disabled={disabled}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ListingCard;
