import prisma from "~/utils/prismadb";

export const getListingById = async (id: string | undefined) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toString() ?? null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
