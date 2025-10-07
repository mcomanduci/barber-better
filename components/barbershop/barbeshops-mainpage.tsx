import { Barbershop } from '@prisma/client';
import React from 'react';

import BarbershopItem from '@/components/barbershop/barbershop-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const BarbershopsMainPage = ({
  barbershops,
  title,
}: {
  barbershops: Barbershop[];
  title: string;
}) => {
  return (
    <>
      <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">{title}</h2>
      <div className="-mx-5 flex gap-4 overflow-auto px-5 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop: Barbershop) => (
          <BarbershopItem barbershop={barbershop} key={barbershop.id} />
        ))}
      </div>
      <div className="hidden md:block">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-4">
            {barbershops.map((barbershop: Barbershop) => (
              <CarouselItem key={barbershop.id} className="basis-auto pl-4">
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 size-12 !bg-black opacity-100 disabled:opacity-0" />
          <CarouselNext className="-right-6 size-12 !bg-black opacity-100 disabled:opacity-0" />
        </Carousel>
      </div>
    </>
  );
};

export default BarbershopsMainPage;
