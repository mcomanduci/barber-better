import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const DialogCancelBooking = ({
  handleCancelBooking,
}: {
  handleCancelBooking: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button variant="destructive" className="flex-1">
          Cancelar Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] !max-w-[480px]">
        <DialogHeader className="!text-center">
          <DialogTitle>Cancelar Reserva</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja cancelar esse agendamento?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="flex-1">
              Voltar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              className="flex-1"
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCancelBooking;
