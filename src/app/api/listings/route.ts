import { NextResponse } from "next/server";

import prisma from "~/utils/prismadb";

import { getCurrentUser } from "~/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
    },
  });

  return NextResponse.json(listing);
};
