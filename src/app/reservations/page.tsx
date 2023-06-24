import { FC } from "react";

import { getCurrentUser } from "~/app/actions/getCurrentUser";
import { getReservations } from "~/app/actions/getReservations";

import NoListings from "~/components/NoListings";

import ReservationPanel from "./components/ReservationPanel";

type Props = {};

const ReservationsPage: FC<Props> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoListings title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <NoListings title="No reservations found" subTitle="Looks like you have no reservations on your properties." />
    );
  }

  return <ReservationPanel reservations={reservations} user={currentUser} />;
};

export default ReservationsPage;
