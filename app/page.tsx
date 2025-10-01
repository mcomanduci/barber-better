import Header from "@/components/header";
import Image from "next/image";
import BarbershopItem from "@/components/barbershop-item";
import { Barbershop } from "@prisma/client";
import { quickSearchOptions } from "@/constants/search";
import Search from "@/components/search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/server";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { getConfirmedBookings } from "@/data/get-bookings";
import { getBarbershops, getPopularBarbershops } from "@/data/get-barbershops";

const BookingItem = dynamic(() => import("@/components/booking-item"), {
  loading: () => <Skeleton className="h-6 w-6" />,
});

const Home = async () => {
  const user = await getCurrentUser();
  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  const confirmedBookings = await getConfirmedBookings();

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {user?.name ? user.name : "bem vindo"}!
        </h2>
        <p>
          <span>
            {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </span>
        </p>

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

        {user && confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Agendamentos
            </h2>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

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
