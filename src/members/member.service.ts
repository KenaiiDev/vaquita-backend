import prismaClient from "@/shared/libs/prismaClient";
import { CreateMemberDto, MemberId, UpdateMemberDto } from "./member.types";
import { EventId } from "@/events/event.types";
import { eventService } from "@/events/event.service";

export const memberService = {
  create: async (data: CreateMemberDto) => {
    return await prismaClient.member.create({
      data,
    });
  },

  getByEventIdOrThrow: async (eventId: EventId) => {
    const event = await eventService.getById(eventId);
    if (!event) throw new Error("Event not found");
    return await prismaClient.member.findMany({
      where: {
        eventId,
      },
    });
  },

  getById: async (id: MemberId) => {
    return await prismaClient.member.findUnique({
      where: {
        id,
      },
    });
  },

  update: async (id: MemberId, data: UpdateMemberDto) => {
    return prismaClient.member.update({
      where: {
        id,
      },
      data,
    });
  },

  delete: async (id: MemberId) => {
    return await prismaClient.member.delete({
      where: {
        id,
      },
    });
  },
};
