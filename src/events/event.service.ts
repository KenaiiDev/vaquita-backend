import prismaClient from "@/shared/libs/prismaClient";
import { CreateEventDto, EventId, UpdateEventDto } from "./event.types";

export const eventService = {
  create: async (data: CreateEventDto) => {
    return await prismaClient.event.create({
      data,
    });
  },

  getAll: async () => {
    return await prismaClient.event.findMany({});
  },

  getById: async (id: EventId) => {
    return await prismaClient.event.findUnique({
      where: {
        id,
      },
    });
  },

  update: async (id: EventId, data: UpdateEventDto) => {
    return prismaClient.event.update({
      where: {
        id,
      },
      data,
    });
  },

  delete: async (id: EventId) => {
    return await prismaClient.event.delete({
      where: {
        id,
      },
    });
  },
};
