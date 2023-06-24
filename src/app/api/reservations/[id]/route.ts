import { NextResponse } from "next/server";

import prisma from "~/utils/prismadb";

import { getCurrentUser } from "~/app/actions/getCurrentUser";

export const DELETE = async (request: Request, { params }: Params) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error(`Invalid reservation ID: ${id}`);
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
};
