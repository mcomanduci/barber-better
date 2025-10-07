import { z } from 'zod';

export const createBookingSchema = z.object({
  serviceId: z.string().cuid('ID do serviço inválido'),
  date: z.date().refine((date) => date > new Date(), {
    message: 'A data deve ser futura',
  }),
});

export const updateBookingRatingSchema = z.object({
  rating: z.number().int().min(1, 'Avaliação mínima é 1').max(5, 'Avaliação máxima é 5'),
});

export const searchBarbershopsSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Digite algo para buscar',
  }),
});

export type SearchBarbershopsInput = z.infer<typeof searchBarbershopsSchema>;
export type updateBookingRatingSchema = z.infer<typeof updateBookingRatingSchema>;
