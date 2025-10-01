"use client";

import { Barbershop, BarbershopService } from "@prisma/client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet } from "./ui/sheet";
import CalendarComp from "./calendar-comp";
import { Dialog, DialogContent } from "./ui/dialog";
import { authClient } from "@/lib/auth-client";
import SignInDialog from "./sign-in-dialog";

// Create a type for serialized service with number price instead of Decimal
type ServiceWithNumberPrice = Omit<BarbershopService, "price"> & {
  price: number;
};

interface ServiceItemProps {
  service: ServiceWithNumberPrice;
  barbershop: Pick<Barbershop, "name" | "phones">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = authClient.useSession();
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = React.useState(false);

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setSignInDialogOpen(true);
  };

  return (
    <>
      <Card className="p-0">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              src={service.imageURL}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
              sizes={"(max-width: 640px) 100vw, 110px"}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Button
                size="sm"
                variant="secondary"
                onClick={handleBookingClick}
              >
                Reservar
              </Button>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={(open) => setBookingSheetIsOpen(open)}
              >
                <CalendarComp
                  service={service}
                  barbershop={barbershop}
                  onSheetClose={() => setBookingSheetIsOpen(false)}
                />
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogOpen}
        onOpenChange={(open) => setSignInDialogOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
