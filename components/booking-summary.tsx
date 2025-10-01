import React from "react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PhoneItems from "./phone-items";
import { Barbershop } from "@prisma/client";

interface ServiceWithNumberPrice {
  name: string;
  price: number;
}

interface BookingSummaryProps {
  service: Pick<ServiceWithNumberPrice, "name" | "price">;
  selectedDay: Date;
  selectedTime: string;
  barbershop: Pick<Barbershop, "name" | "phones">;
}

const BookingSummary = ({
  service,
  selectedDay,
  selectedTime,
  barbershop,
}: BookingSummaryProps) => {
  return (
    <>
      <Card className="p-0">
        <CardContent className="space-y-3 p-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{service.name}</h2>
            <p className="font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Data</h2>
            <p className="text-sm">
              {format(selectedDay, "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Horário</h2>
            <p className="text-sm">{selectedTime}</p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Barbearia</h2>
            <p className="text-sm font-bold">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-5 space-y-4">
        {barbershop.phones.map((phone, index) => (
          <PhoneItems key={index} phone={phone} />
        ))}
      </div>
    </>
  );
};

export default BookingSummary;
