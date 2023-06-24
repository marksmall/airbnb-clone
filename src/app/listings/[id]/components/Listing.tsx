"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { differenceInDays, eachDayOfInterval } from "date-fns";

import { Range } from "react-date-range";

import { toast } from "react-hot-toast";

import { useLoginModal } from "~/hooks/useLoginModal";

import { SafeListing, SafeReservation, SafeUser } from "~/types/user";

import { CATEGORIES } from "~/components/navbar/CategoryList";
import Container from "~/components/Container";

import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

type Props = {
  listing: SafeListing & { user: SafeUser };
  user: SafeUser | null;
  reservations?: SafeReservation[];
};

const INITIAL_DATE_RANGE: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const Listing: FC<Props> = ({ listing, user, reservations }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

  const category = useMemo(() => CATEGORIES.find((cat) => cat.label === listing.category), [listing.category]);

  const reservedDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      daysCount && listing.price ? setTotalPrice(daysCount * listing.price) : setTotalPrice(listing.price);
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  const onCreateReservation = useCallback(async () => {
    if (!user) {
      loginModal.onOpen();
    }

    setIsLoading(true);

    const reservation = {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    };

    const response = await fetch("/api/reservations", {
      method: "POST",
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      console.log(`Something went wrong creating new reservation: `, reservation);
      toast.error("Something went Wrong creating new reservation");
    }

    toast.success("Listing reserved!");
    setDateRange(INITIAL_DATE_RANGE);
    router.push("/trips");
    setIsLoading(false);
  }, [dateRange.endDate, dateRange.startDate, listing?.id, loginModal, router, totalPrice, user]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            user={user}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo user={listing.user} category={category} listing={listing} />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                reservedDates={reservedDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
