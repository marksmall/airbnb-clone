import { MouseEvent, useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { SafeUser } from "~/types/user";

import { useLoginModal } from "./useLoginModal";

type Favorite = {
  listingId: string;
  user?: SafeUser | null;
};

export const useFavorite = ({ listingId, user }: Favorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds ?? [];

    return list.includes(listingId);
  }, [listingId, user]);

  const toggleFavorite = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      const response = await fetch(`/api/favorites/${listingId}`, {
        method: hasFavorited ? "DELETE" : "POST",
      });

      if (!response.ok) {
        toast.error(`Something went wrong toggling favorite for listing ${listingId}`);
      }

      router.refresh();
      toast.success("Successfully toggled listing favorite");
    },
    [hasFavorited, listingId, loginModal, router, user]
  );

  return { hasFavorited, toggleFavorite };
};
