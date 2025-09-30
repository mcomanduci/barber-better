import Header from "@/components/header";
import Image from "next/image";
import BarbershopItem from "@/components/barbershop-item";
import db from "@/lib/prisma";
import { Barbershop } from "@prisma/client";
import { quickSearchOptions } from "@/constants/search";
import BookingItem from "@/components/booking-item";
import Search from "@/components/search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/server";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  const user = await getCurrentUser();

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {user?.name}!</h2>
        <p>Segunda-feira, 22 de Setembro</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="-mx-5 mt-6 flex gap-3 overflow-x-scroll pr-5 pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="mt-6 flex-1"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageURL}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            priority
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="-mx-5 flex gap-4 overflow-auto pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="-mx-5 flex gap-4 overflow-auto pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop: Barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
