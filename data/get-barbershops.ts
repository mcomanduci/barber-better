import db from '@/lib/prisma';

export const getBarbershops = async () => {
  return await db.barbershop.findMany({});
};

export const getPopularBarbershops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });
};

export const getMostVisitedBarbershops = async () => {
  return await db.barbershop.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getBetterRatedBarbershops = async () => {
  return await db.barbershop.findMany({});
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
                mode: 'insensitive',
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: 'insensitive',
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

export const getBarbershopRating = async (barbershopId: string) => {
  const ratings = await db.booking.findMany({
    where: {
      service: {
        barbershopId,
      },
      rating: {
        not: null,
      },
    },
    select: {
      rating: true,
    },
  });

  if (!ratings || ratings.length === 0) return null;

  const totalRating = ratings.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const averageRating = totalRating / ratings.length;
  return averageRating.toFixed(1);
};

export const getBarbershopRatingCount = async (barbershopId: string) => {
  return await db.booking.count({
    where: {
      service: {
        barbershopId,
      },
      rating: {
        not: null,
      },
    },
  });
};
