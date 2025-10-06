import Header from '@/components/layout/header';
import Image from 'next/image';
import { quickSearchOptions } from '@/constants/search';
import Search from '@/components/general/search';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/server';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { getConfirmedBookings } from '@/data/get-bookings';
import {
  getBarbershops,
  getMostVisitedBarbershops,
  getPopularBarbershops,
} from '@/data/get-barbershops';
import BarbershopsMainPage from '@/components/barbershop/barbeshops-mainpage';

const BookingItem = dynamic(() => import('@/components/booking/booking-item'), {
  loading: () => <Skeleton className="h-[150px] w-full" />,
});

const Home = async () => {
  const user = await getCurrentUser();
  const [barbershops, popularBarbershops, mostVisitedBarbershops, confirmedBookings] =
    await Promise.all([
      getBarbershops(),
      getPopularBarbershops(),
      getMostVisitedBarbershops(),
      getConfirmedBookings(),
    ]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-5 py-5 md:py-0">
        <div className="relative -mx-5 flex flex-col gap-6 px-5 md:flex-row md:items-stretch md:justify-between md:py-8 lg:gap-10 xl:gap-30">
          <div
            className="absolute inset-0 right-[50%] left-[50%] -mr-[50vw] -ml-[50vw] hidden w-screen bg-cover bg-center bg-no-repeat opacity-15 grayscale md:block"
            style={{ backgroundImage: 'url(/barbercut.png)' }}
          />
          <div className="relative z-10 flex flex-1 flex-col justify-between md:max-w-[460px]">
            <div className="pt-4">
              <h2 className="text-xl font-bold">Olá, {user?.name ?? 'bem vindo'}!</h2>
              <p className="text-sm text-gray-400">
                {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>{' '}
              <div className="mt-6">
                <Search />
              </div>
            </div>

            <div className="-mx-5 mt-6 flex gap-3 overflow-x-scroll px-5 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button key={option.title} className="gap-2" variant="secondary" asChild>
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image src={option.imageURL} alt={option.title} width={16} height={16} />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="relative mt-6 h-[150px] w-full md:hidden">
              <Image
                src="/banner-01.png"
                alt="Agende nos melhores com FSW Barber"
                fill
                priority
                className="rounded-xl object-cover"
              />
            </div>

            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
                  Agendamentos
                </h2>
                <div className="-mx-5 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
                <div className="hidden md:block">
                  <BookingItem booking={confirmedBookings[0]} />
                </div>
              </>
            )}
          </div>

          <div className="relative z-10 flex-1 md:min-w-0">
            <BarbershopsMainPage title="Recomendados" barbershops={barbershops} />
          </div>
        </div>

        <div className="mt-6">
          <BarbershopsMainPage title="Populares" barbershops={popularBarbershops} />
        </div>

        <div className="mt-10 mb-10 hidden md:block">
          <BarbershopsMainPage title="Mais Visitados" barbershops={mostVisitedBarbershops} />
        </div>
      </div>
    </>
  );
};

export default Home;
