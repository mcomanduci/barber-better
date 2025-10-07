'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/prisma';
import { getCurrentUser } from '@/server/users';

interface CreateBookingParams {
  serviceId: string;
  date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getCurrentUser();
  if (!session?.user) throw new Error('Usuário não autenticado');
  await db.booking.create({
    data: { ...params, userId: session.user.id },
  });
  revalidatePath(`/barbershops/[id]`);
};
