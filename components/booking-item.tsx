import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import BookingSummary from "./booking-summary";
import PhoneItems from "./phone-items";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

// TODO: Receber dados via props
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);
  const barbershop = booking.service.barbershop;
  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full min-w-[350px]">
          <Card className="min-w-full p-0">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit rounded-2xl"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="text-left font-semibold">
                  {booking.service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={barbershop.imageURL}
                      alt="Barbeiro"
                      width={32}
                      height={32}
                    />
                    <AvatarFallback>BF</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className="min-w-[350px] gap-0 pt-0 sm:min-w-[500px]">
          <SheetHeader className="border-b border-solid px-5 py-5">
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>
          <div className="relative flex h-[180px] w-full items-end px-5">
            <Image
              src="/map.png"
              alt={`Mapa da barbearia ${barbershop.name}`}
              fill
              className="rounded-xl object-cover px-5 pt-5"
            />
            <Card className="z-50 mx-3 mb-3 w-full p-0">
              <CardContent className="flex items-center gap-3 rounded-xl px-5 py-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={barbershop.imageURL}
                    alt="Barbeiro"
                    className="h-12 w-12"
                    width={48}
                    height={48}
                  />
                  <AvatarFallback>BF</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-5">
            <Badge
              className="w-fit rounded-2xl"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
          </div>
          <div className="border-t border-solid px-5 py-5">
            <BookingSummary
              service={{
                ...booking.service,
                price: Number(booking.service.price),
              }}
              selectedDay={booking.date}
              selectedTime={format(booking.date, "HH:mm", { locale: ptBR })}
              barbershop={barbershop}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BookingItem;
