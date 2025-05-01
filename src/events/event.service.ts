import prismaClient from "@/shared/libs/prismaClient";
import { CreateEventDto } from "./event.types";

export const eventService = {
  create: async (body: CreateEventDto) => {
    return await prismaClient.event.create({
      data: body,
    });
  },
};
