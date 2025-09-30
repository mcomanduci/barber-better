import React from "react";
import db from "@/lib/prisma";
import BarbershopItem from "@/components/barbershop-item";
import Header from "@/components/header";
import Search from "@/components/search";

interface BarbershopPageProps {
  searchParams: Promise<{ title?: string; service?: string }>;
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const resolvedSearchParams = await searchParams;

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        resolvedSearchParams.title
          ? {
              name: {
                contains: resolvedSearchParams.title,
                mode: "insensitive",
              },
            }
          : {},
        resolvedSearchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: resolvedSearchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;
          {resolvedSearchParams?.title || resolvedSearchParams?.service}
          &quot;
        </h2>
        <div>
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
