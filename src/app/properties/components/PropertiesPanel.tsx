"use client";

import { FC, useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { SafeListing, SafeUser } from "~/types/user";

import Container from "~/components/Container";
import Heading from "~/components/Heading";
import ListingCard from "~/components/ListingCard";

type Props = {
  listings: SafeListing[];
  user?: SafeUser | null;
};

const PropertiesPanel: FC<Props> = ({ listings, user }) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      const response = await fetch(`/api/listings${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      }

      toast.success("Listing deleted");
      router.refresh();

      setDeletingId("");
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            user={user}
            actionId={listing.id}
            onAction={onCancel}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesPanel;
