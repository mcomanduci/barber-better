"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

interface DialogConfirmationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
}

const DialogConfirmation = ({
  isOpen,
  onOpenChange,
  title,
  description,
}: DialogConfirmationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[280px] space-y-4">
        <Image
          src="/confirm.svg"
          alt="Success"
          width={72}
          height={72}
          className="mx-auto mb-4"
        />
        <DialogHeader className="space-y-2 !text-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button size="lg" variant="secondary" className="mb-0">
            Confirmar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmation;
