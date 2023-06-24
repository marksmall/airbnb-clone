import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import prisma from "~/utils/prismadb";

const SALT = 12;

export const POST = async (request: Request) => {
  const { email, name, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, SALT);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
};
