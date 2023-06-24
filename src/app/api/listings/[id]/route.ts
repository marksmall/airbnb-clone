import { NextResponse } from "next/server";

import { getCurrentUser } from "~/app/actions/getCurrentUser";

import prisma from "~/utils/prismadb";

export const DELETE = async (request: Request, { params: { id } }: Params) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!id || typeof id != "string") {
    throw new Error(`Invalid listing ID: ${id}`);
  }

  const listing = prisma.listing.deleteMany({
    where: {
      id,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};
