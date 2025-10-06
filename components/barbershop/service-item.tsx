'use client';

import { Barbershop, BarbershopService } from '@prisma/client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import dynamic from 'next/dynamic';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { authClient } from '@/lib/auth-client';
import SignInDialog from '@/components/auth/sign-in-dialog';
import { Skeleton } from '@/components/ui/skeleton';

// Create a type for serialized service with number price instead of Decimal
type ServiceWithNumberPrice = Omit<BarbershopService, 'price'> & {
  price: number;
};

interface ServiceItemProps {
  service: ServiceWithNumberPrice;
  barbershop: Pick<Barbershop, 'name' | 'phones'>;
}

const CalendarComp = dynamic(() => import('@/components/booking/calendar-comp'), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});

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
              sizes={'(max-width: 640px) 100vw, 110px'}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>

              <Button size="sm" variant="secondary" onClick={handleBookingClick}>
                Reservar
              </Button>

              <Sheet open={bookingSheetIsOpen} onOpenChange={(open) => setBookingSheetIsOpen(open)}>
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

      <Dialog open={signInDialogOpen} onOpenChange={(open) => setSignInDialogOpen(open)}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
