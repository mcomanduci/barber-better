"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBooking = async (bookingId: string) => {
  try {
    await db.booking.delete({
      where: { id: bookingId },
    });
    revalidatePath("/bookings");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return {
      success: false,
      error: "Não foi possível cancelar a reserva. Tente novamente.",
    };
  }
};
