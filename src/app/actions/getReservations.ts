import prisma from "~/utils/prismadb";

type ReservationParams = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export const getReservations = async ({ listingId, userId, authorId }: ReservationParams) => {
  try {
    let query: any = {};

    if (listingId) {
      query.listingId = listingId;
    } else if (userId) {
      query.userId = userId;
    } else if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
