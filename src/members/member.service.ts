import prismaClient from "@/shared/libs/prismaClient";
import { CreateMemberDto, MemberId, UpdateMemberDto } from "./member.types";
import { EventId } from "@/events/event.types";

export const memberService = {
  create: async (data: CreateMemberDto) => {
    return await prismaClient.member.create({
      data,
    });
  },

  getByEventId: async (event: EventId) => {
    return await prismaClient.member.findMany({
      where: {
        eventId: event,
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
