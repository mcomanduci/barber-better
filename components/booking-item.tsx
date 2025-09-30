import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// TODO: Receber dados via props
const BookingItem = () => {
  return (
    <>
      <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit rounded-2xl">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                  alt="Barbeiro"
                  width={32}
                  height={32}
                />
                <AvatarFallback>BF</AvatarFallback>
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Setembro</p>
            <p className="text-2xl">22</p>
            <p className="text-sm">15:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
