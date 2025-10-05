import PhoneItems from "@/components/phone-items";
import ServiceItem from "@/components/service-item";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  getBarbershopById,
  getBarbershopRating,
  getBarbershopRatingCount,
} from "@/data/get-barbershops";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: Promise<{
    id: string;
    imageURL: string;
    name: string;
  }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const rating = await getBarbershopRating(id);
  const ratingCount = await getBarbershopRatingCount(id);
  const barbershop = await getBarbershopById(id);
  if (!barbershop) {
    return notFound();
  }

  // Convert Decimal prices to numbers for serialization
  const barbershopWithSerializablePrices = {
    ...barbershop,
    services: barbershop.services.map((service) => ({
      ...service,
      price: Number(service.price),
    })),
  };

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershopWithSerializablePrices.imageURL}
          alt={barbershopWithSerializablePrices.name}
          fill
          className="object-cover"
        />

        <Button
          variant="secondary"
          className="absolute top-4 left-4"
          size="icon"
          asChild
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sidebar>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4"
          >
            <MenuIcon className="size-5" />
          </Button>
        </Sidebar>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">
          {barbershopWithSerializablePrices.name}
        </h1>
        <div className="item-center mb-2 flex gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershopWithSerializablePrices.address}</p>
        </div>
        <div className="item-center flex gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">
            {rating ? (
              <>
                {rating} ({ratingCount}{" "}
                {ratingCount === 1 ? "avaliação" : "avaliações"})
              </>
            ) : (
              "Sem Avaliação"
            )}
          </p>
        </div>
      </div>
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">
          {barbershopWithSerializablePrices.description}
        </p>
      </div>
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbershopWithSerializablePrices.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershopWithSerializablePrices}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Contato</h2>
        {barbershopWithSerializablePrices.phones.map((phone, index) => (
          <PhoneItems key={index + 1} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
