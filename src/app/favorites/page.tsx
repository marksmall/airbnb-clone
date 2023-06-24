import { FC } from "react";

import { getCurrentUser } from "~/app/actions/getCurrentUser";
import { getFavoriteListings } from "~/app/actions/getFavoriteListings";

import NoListings from "~/components/NoListings";

import FavoritesPanel from "./components/FavoritesPanel";

type Props = {};

const FavoritesPage: FC<Props> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoListings title="Unauthorized" subTitle="Please login" />;
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return <NoListings title="No favorites found" subTitle="Looks like you have no favorite listings." />;
  }

  return <FavoritesPanel listings={listings} user={currentUser} />;
};

export default FavoritesPage;
