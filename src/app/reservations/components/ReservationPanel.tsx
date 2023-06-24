"use client";

import { FC, useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { SafeReservation, SafeUser } from "~/types/user";

import Container from "~/components/Container";
import Heading from "~/components/Heading";
import ListingCard from "~/components/ListingCard";

type Props = {
  reservations: SafeReservation[];
  user?: SafeUser | null;
};

const ReservationPanel: FC<Props> = ({ reservations, user }) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Something went wrong");
      }

      toast.success("Reservation cancelled");
      router.refresh();

      setDeletingId("");
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            user={user}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            actionLabel="Cancel guest reservation"
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationPanel;
