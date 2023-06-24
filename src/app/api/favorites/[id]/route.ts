import { NextResponse } from "next/server";

import prisma from "~/utils/prismadb";

import { getCurrentUser } from "~/app/actions/getCurrentUser";

export const POST = async (request: Request, { params }: Params) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error(`Invalid listing ID: ${id}`);
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};

export const DELETE = async (request: Request, { params }: Params) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error(`Invalid listing ID: ${id}`);
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};
