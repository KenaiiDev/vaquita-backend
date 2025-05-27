import { memberService } from "./member.service";
import { httpResponse } from "@/shared/libs/httpResponse";

import type { Request, NextFunction } from "express";
import type {
  CreateMemberDto,
  UpdateMemberDto,
  Member,
  MemberId,
} from "./member.types";
import type {
  CustomResponseData,
  CustomResponseMessage,
} from "@/shared/types/response.types";
import { eventService } from "@/events/event.service";

const createMember = async (
  req: Request<unknown, unknown, CreateMemberDto>,
  res: CustomResponseData<Member>,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const member = await memberService.create(body);
    return httpResponse.CREATED(res, member);
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (
  req: Request<{ id: string }>,
  res: CustomResponseMessage | CustomResponseData<Member>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const member = await memberService.getById(id);
    if (!member) {
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "Event not found"
      );
    }
    return httpResponse.OK(res as CustomResponseData<Member>, member);
  } catch (error) {
    next(error);
  }
};

const getMembersByEvent = async (
  req: Request<{ eventId: string }>,
  res: CustomResponseMessage | CustomResponseData<Member[]>,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;

    const event = await eventService.getById(eventId);
    if (!event)
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "Event not found"
      );

    const members = await memberService.getByEventIdOrThrow(eventId);
    if (!members) {
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "No members found"
      );
    }
    return httpResponse.OK(res as CustomResponseData<Member[]>, members);
  } catch (error) {
    next(error);
  }
};

const updateMember = async (
  req: Request<{ id: MemberId }, unknown, UpdateMemberDto>,
  res: CustomResponseData<Member>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedMember = await memberService.update(id, body);
    if (!updateMember) {
      return httpResponse.NOT_FOUND(
        res as CustomResponseMessage,
        "Member not found"
      );
    }
    return httpResponse.OK(res as CustomResponseData<Member>, updatedMember);
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (
  req: Request<{ id: MemberId }>,
  res: CustomResponseMessage,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleted = await memberService.delete(id);
    if (!deleted) {
      return httpResponse.NOT_FOUND(res, "Member not found");
    }
    return httpResponse.NO_CONTENT(res);
  } catch (error) {
    next(error);
  }
};

export {
  createMember,
  getMemberById,
  getMembersByEvent,
  updateMember,
  deleteMember,
};
