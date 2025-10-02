import Header from "@/components/header";
import React from "react";
import { getCurrentUserOptional } from "@/server/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import {
  getConfirmedBookings,
  getConcludedBookings,
} from "@/data/get-bookings";

const BookingItem = dynamic(() => import("@/components/booking-item"), {
  loading: () => <Skeleton className="h-6 w-6" />,
});

const Page = async () => {
  const session = await getCurrentUserOptional();

  if (!session?.user) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center space-y-4 p-5">
          <h1 className="text-xl font-bold">Agendamentos</h1>
          <p className="text-center text-gray-600">
            Você precisa estar logado para ver seus agendamentos.
          </p>
          <Button asChild>
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </>
    );
  }

  const confirmedBookings = await getConfirmedBookings();
  const concludedBookings = await getConcludedBookings();

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="space-y-4">
          {confirmedBookings.length > 0 && (
            <>
              <h3 className="text-xs font-bold text-gray-400 uppercase">
                Confirmados
              </h3>
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </>
          )}

          {concludedBookings.length > 0 && (
            <>
              <h3 className="text-xs font-bold text-gray-400 uppercase">
                Finalizados
              </h3>
              {concludedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </>
          )}

          {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
            <p className="text-sm text-gray-400">
              Você não possui agendamentos, que tal reservar um horário?
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
