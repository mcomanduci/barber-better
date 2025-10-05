"use server";

import { getCurrentUserOptional } from "@/server/users";
import db from "@/lib/prisma";

export const getConcludedBookings = async () => {
  const session = await getCurrentUserOptional();
  if (!session?.user) return [];

  const rawConcludedBookings = await db.booking.findMany({
    where: {
      userId: session.user?.id,
      date: {
        lt: new Date(),
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return rawConcludedBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }));
};

export const getConfirmedBookings = async () => {
  const session = await getCurrentUserOptional();
  if (!session?.user) return [];

  const rawConfirmedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(), // Only get bookings from today onwards
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return rawConfirmedBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }));
};

export const getBookingRating = async (bookingId: string) => {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { rating: true },
  });
  return booking?.rating || null;
};
