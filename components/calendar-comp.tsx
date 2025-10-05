'use client';

import React, { useEffect } from 'react';
import { ptBR } from 'date-fns/locale';
import { Button } from './ui/button';
import { Barbershop, BarbershopService, Booking } from '@prisma/client';
import { format } from 'date-fns/format';
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';
import { createBooking } from '@/actions/create-booking';
import { authClient } from '@/lib/auth-client';
import { set, startOfDay } from 'date-fns';
import { toast } from 'sonner';
import { getBookings } from '@/actions/get-bookings';
import { Calendar } from './ui/calendar';
import { Skeleton } from './ui/skeleton';
import BookingSummary from './booking-summary';
import DialogConfirmation from './dialog-confirmation';
import { createBookingSchema } from '@/lib/validations';

// Create a type for serialized service with number price instead of Decimal
type ServiceWithNumberPrice = Omit<BarbershopService, 'price'> & {
  price: number;
};

interface ServiceItemProps {
  service: ServiceWithNumberPrice;
  barbershop: Pick<Barbershop, 'name' | 'phones'>;
  onSheetClose?: () => void;
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];

const CalendarComp = ({ service, barbershop, onSheetClose }: ServiceItemProps) => {
  const { data } = authClient.useSession();
  const [selectedDay, setSelectedDay] = React.useState<Date>(startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(undefined);
  const [dayBookings, setDayBookings] = React.useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

  const getTimeList = (bookings: Booking[]) => {
    const bookedTimes = bookings.map((booking) => format(booking.date, 'HH:mm'));
    const now = new Date();
    const isToday = format(selectedDay, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');

    let availableTimes = TIME_LIST.filter((time) => !bookedTimes.includes(time));

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const oneHourFromNow = currentHour + 1 + (currentMinute > 0 ? 1 : 0);

      availableTimes = availableTimes.filter((time) => {
        const [timeHour] = time.split(':').map(Number);
        return timeHour >= oneHourFromNow;
      });
    }

    return availableTimes;
  };

  const resetCalendarState = () => {
    setSelectedDay(startOfDay(new Date()));
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      setIsLoadingBookings(true);
      try {
        const bookings = await getBookings({
          serviceId: service.id,
          date: selectedDay,
        });
        setDayBookings(bookings);
      } finally {
        setIsLoadingBookings(false);
      }
    };
    fetch();
  }, [selectedDay, service.id]);

  const handleSelectedDay = (day: Date) => {
    setSelectedDay(startOfDay(day));
    setSelectedTime(undefined); // Clear selected time when day changes
    setDayBookings([]); // Clear previous bookings immediately
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    if (!selectedTime || !selectedDay || !data?.user?.id) return;

    const hour = Number(selectedTime?.split(':')[0]);
    const minute = Number(selectedTime?.split(':')[1]);

    const newDate = set(selectedDay, {
      hours: hour,
      minutes: minute,
      seconds: 0,
      milliseconds: 0,
    });

    const result = createBookingSchema.safeParse({
      serviceId: service.id,
      date: newDate,
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message ?? 'Dados inválidos';
      toast.error(firstError);
      console.error(result.error);
      return;
    }

    try {
      await createBooking(result.data);
      setIsConfirmationOpen(true);
      resetCalendarState();
      onSheetClose?.();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar reserva!');
    }
  };

  return (
    <>
      <SheetContent className="gap-0 overflow-y-auto px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <SheetHeader className="p-0">
          <SheetTitle className="mx-auto pt-6">Fazer Reserva</SheetTitle>
        </SheetHeader>
        <div className="border-b border-solid py-5">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={selectedDay}
            onSelect={handleSelectedDay}
            disabled={{ before: new Date() }}
            required
            className="w-full"
          />
        </div>

        {selectedDay && (
          <div>
            <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {isLoadingBookings ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 w-17 min-w-17 flex-shrink-0 rounded-full" />
                ))
              ) : getTimeList(dayBookings).length === 0 ? (
                <p className="mx-auto flex h-9 items-center text-sm text-gray-400">
                  Não há horários disponíveis neste dia.
                </p>
              ) : (
                getTimeList(dayBookings).map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    className="rounded-full border-1"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))
              )}
            </div>
          </div>
        )}

        {selectedTime && (
          <div className="p-5">
            <BookingSummary
              service={service}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              barbershop={barbershop}
            />
          </div>
        )}
        <SheetFooter className="mt-auto px-5">
          <SheetClose asChild>
            <Button
              disabled={!selectedTime || !selectedDay}
              onClick={handleCreateBooking}
              className="w-full"
            >
              Confirmar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      <DialogConfirmation
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Reserva Efetuada!"
        description="Sua reserva foi agendada com sucesso."
      />
    </>
  );
};

export default CalendarComp;
