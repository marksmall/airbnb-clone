import { FC } from "react";

import { getCurrentUser } from "~/app/actions/getCurrentUser";
import { getReservations } from "~/app/actions/getReservations";

import NoListings from "~/components/NoListings";

import TripsPanel from "./components/TripsPanel";

type Props = {};

const TripsPage: FC<Props> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoListings title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return <NoListings title="No trips found" subTitle="Looks like you haven't reserved any trips." />;
  }

  return <TripsPanel reservations={reservations} user={currentUser} />;
};

export default TripsPage;
