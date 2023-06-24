import prisma from "~/utils/prismadb";

import { getCurrentUser } from "./getCurrentUser";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds ?? [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
