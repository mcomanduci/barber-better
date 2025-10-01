import db from "@/lib/prisma";

export const getBarbershops = async () => {
  return await db.barbershop.findMany({});
};

export const getPopularBarbershops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
};

export const searchBarbershops = async (
  title: string | undefined,
  service?: string | undefined,
) => {
  return await db.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });
};

export const getBarbershopById = async (id: string) => {
  return await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });
};
