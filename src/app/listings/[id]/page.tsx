import { FC } from "react";

import { getCurrentUser } from "~/app/actions/getCurrentUser";
import { getListingById } from "~/app/actions/getListingById";
import { getReservations } from "~/app/actions/getReservations";

import NoListings from "~/components/NoListings";

import Listing from "./components/Listing";

type Props = {
  params: {
    id: string;
  };
};

const ListingPage: FC<Props> = async ({ params: { id } }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(id);
  const reservations = await getReservations({ listingId: id });

  if (!listing) {
    return <NoListings showReset />;
  }

  return <Listing listing={listing} user={currentUser} reservations={reservations} />;
};

export default ListingPage;
