import { Event as PrismaEvent } from "@prisma/client";

export type Event = PrismaEvent;

export type CreateEventDto = Omit<Event, "id" | "createdAt" | "updatedAt">;
export type UpdateEventDto = Partial<
  Omit<Event, "id" | "createdAt" | "updatedAt">
>;
