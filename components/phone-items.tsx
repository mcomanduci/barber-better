"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemsProps {
  phone: string;
}

const PhoneItems = ({ phone }: PhoneItemsProps) => {
  const handleCopyToClipboard = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Telefone copiado para a área de transferência!");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyToClipboard(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItems;
