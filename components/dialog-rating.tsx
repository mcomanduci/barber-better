"use client";

import React, { useState } from "react";
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
import { Star } from "lucide-react";
import DialogConfirmation from "./dialog-confirmation";

const DialogRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleSendRating = () => {
    // Here you can add the logic to send the rating to the server
    setIsConfirmationOpen(true);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex-1">Avaliar</Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] !max-w-[480px]">
          <DialogHeader className="!text-center">
            <DialogTitle>Avalie sua experiência</DialogTitle>
            <DialogDescription>
              Toque nas estrelas para avaliar sua experiência na barbearia.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-5">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={starValue}
                  className={`cursor-pointer ${
                    starValue <= (hoverRating || rating)
                      ? "fill-primary text-primary"
                      : "text-gray-700"
                  }`}
                  size={28}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              );
            })}
          </div>
          <DialogFooter className="flex flex-row gap-3">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="flex-1" onClick={handleSendRating}>
                Enviar Avaliação
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogConfirmation
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Avaliação Efetuada!"
        description="Sua avaliação foi efetuada com sucesso."
      />
    </>
  );
};

export default DialogRating;
