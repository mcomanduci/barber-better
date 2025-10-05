"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/prisma";
import { getCurrentUser } from "@/server/users";
import { updateBookingRatingSchema } from "@/lib/validations";

export const rateBooking = async ({
  bookingId,
  rating,
}: {
  bookingId: string;
  rating: number;
}) => {
  const validatedData = updateBookingRatingSchema.parse({ rating });

  const session = await getCurrentUser();
  if (!session?.user) throw new Error("Usuário não autenticado");

  // Verificar se a reserva pertence ao usuário
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, date: true },
  });

  if (!booking) throw new Error("Reserva não encontrada");
  if (booking.userId !== session.user.id) throw new Error("Não autorizado");

  // Verificar se a reserva já passou
  if (booking.date > new Date()) {
    throw new Error("Só é possível avaliar após o serviço ser realizado");
  }

  // Atualizar a reserva com a avaliação
  await db.booking.update({
    where: { id: bookingId },
    data: {
      rating: validatedData.rating,
    },
  });

  revalidatePath("/bookings");
  revalidatePath(`/barbershops/[id]`);
};
