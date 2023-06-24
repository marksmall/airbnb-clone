import { FC } from "react";

import { SafeListing, SafeUser } from "~/types/user";

import Container from "~/components/Container";
import Heading from "~/components/Heading";
import ListingCard from "~/components/ListingCard";

type Props = {
  listings: SafeListing[];
  user?: SafeUser | null;
};

const FavoritesPanel: FC<Props> = ({ listings, user }) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} user={user} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesPanel;
