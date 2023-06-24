import { FC } from "react";
import { getCurrentUser } from "./actions/getCurrentUser";
import { ListingsParams, getListings } from "./actions/getListings";

import Container from "~/components/Container";
import NoListings from "~/components/NoListings";
import ListingCard from "~/components/ListingCard";

type Props = {
  searchParams: ListingsParams;
};

const HomePage: FC<Props> = async ({ searchParams }) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <NoListings showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.title} listing={listing} user={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
