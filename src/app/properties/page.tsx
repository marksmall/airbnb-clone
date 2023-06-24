import { FC } from "react";

import { getCurrentUser } from "~/app/actions/getCurrentUser";
import { getListings } from "~/app/actions/getListings";

import NoListings from "~/components/NoListings";

import PropertiesPanel from "./components/PropertiesPanel";

type Props = {};

const PropertiesPage: FC<Props> = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoListings title="Unauthorized" subTitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return <NoListings title="No properties found" subTitle="Looks like you have no properties." />;
  }

  return <PropertiesPanel listings={listings} user={currentUser} />;
};

export default PropertiesPage;
