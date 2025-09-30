import Header from "@/components/header";
import React from "react";
import db from "@/lib/prisma";
import { getCurrentUser } from "@/server/users";
import { notFound } from "next/navigation";
import BookingItem from "@/components/booking-item";

const Page = async () => {
  const session = await getCurrentUser();
  if (!session.user) {
    return notFound();
  }
  const confirmedBookings = await db.booking.findMany({
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: session.user?.id,
      date: {
        lt: new Date(), // Only get bookings before today
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

  return (
    <>
      <Header />
      <div className="space-y-5 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="space-y-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
          <p className="pt-2 text-xl font-bold">Concluídos</p>
          {concludedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
