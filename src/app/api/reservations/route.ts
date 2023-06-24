import { NextResponse } from "next/server";

import prisma from "~/utils/prismadb";

import { getCurrentUser } from "~/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId, startDate, endDate, totalPrice } = await request.json();

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const reservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(reservation);
};
