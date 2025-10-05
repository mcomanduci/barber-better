import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";

import Link from "next/link";
import { getBarbershopRating } from "@/data/get-barbershops";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = async ({ barbershop }: BarbershopItemProps) => {
  const rating = await getBarbershopRating(barbershop.id);
  return (
    <Card className="min-w-[167px] rounded-2xl p-[3px]">
      <CardContent className="p-0">
        <div className="relative mx-auto h-[159px] w-[159px]">
          <Image
            src={barbershop.imageURL}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
            sizes="(max-width: 640px) 100vw, 159px"
          />
          <Badge
            className="bg-secondary/60 absolute top-2 left-2 space-x-0.5 rounded-2xl border-0 py-1 backdrop-blur-lg"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">{rating || "Sem Avaliação"}</p>
          </Badge>
        </div>
        <div className="px-2 pt-2 pb-2">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
