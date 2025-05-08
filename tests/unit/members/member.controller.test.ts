import { expect, describe, vi, beforeEach, afterEach, it } from "vitest";
import httpMocks from "node-mocks-http";

import { memberService } from "@/members/__mocks__/member.service";
import { httpResponse } from "@/shared/libs/__mocks__/httpResponse";

import {
  getMemberById,
  getMembersByEvent,
  createMember,
  updateMember,
  deleteMember,
} from "@/members/member.controller";

import type { NextFunction, Request } from "express";
import type { Member, CreateMemberDto } from "@/members/member.types";
import {
  CustomResponseData,
  CustomResponseMessage,
} from "@/shared/types/response.types";

vi.mock("@/shared/libs/httpResponse");
vi.mock("@/members/member.service");

describe("Member controller", () => {
  const mockDate = new Date("2025-05-04T12:00:00Z");

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Create", () => {
    it("Should create and return a new Member", async () => {
      const eventId = "event1";
      const memberData: CreateMemberDto = {
        eventId,
        name: "John Doe",
      };

      const createdMember: Member = {
        id: "member1",
        ...memberData,
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const req = httpMocks.createRequest({
        method: "POST",
        url: "/members",
        body: memberData,
      });

      const res =
        httpMocks.createResponse() as unknown as CustomResponseData<Member>;
      const next = vi.fn() as NextFunction;

      memberService.create.mockResolvedValue(createdMember);

      const mockHttpResponse =
        httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
      httpResponse.CREATED.mockReturnValue(mockHttpResponse);

      const result = await createMember(req, res, next);

      expect(memberService.create).toHaveBeenCalledWith(memberData);
      expect(httpResponse.CREATED).toHaveBeenCalledWith(res, createdMember);
      expect(result).toBe(mockHttpResponse);
    });
  });

  describe("Get Member By ID", () => {
    it("Should return a member by ID", async () => {
      const memberId = "member1";
      const member: Member = {
        id: memberId,
        name: "John Doe",
        eventId: "event1",
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/members/${memberId}`,
        params: { id: memberId },
      }) as Request<{ id: string }, unknown, unknown>;

      const res =
        httpMocks.createResponse() as unknown as CustomResponseData<Member>;
      const next = vi.fn() as NextFunction;

      memberService.getById.mockResolvedValue(member);

      const mockHttpResponse =
        httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
      httpResponse.OK.mockReturnValue(mockHttpResponse);

      const result = await getMemberById(req, res, next);

      expect(memberService.getById).toHaveBeenCalledWith(memberId);
      expect(httpResponse.OK).toHaveBeenCalledWith(res, member);
      expect(result).toBe(mockHttpResponse);
    });
  });

  describe("Get Members By Event", () => {
    it("Should return members belonging to a specific event", async () => {
      const eventId = "event1";
      const members: Member[] = [
        {
          id: "member1",
          name: "John Doe",
          eventId,
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        {
          id: "member2",
          name: "Jane Smith",
          eventId,
          createdAt: mockDate,
          updatedAt: mockDate,
        },
      ];

      const req = httpMocks.createRequest({
        method: "GET",
        url: `/events/${eventId}/members`,
        params: { eventId },
      }) as Request<{ eventId: string }, unknown, unknown>;

      const res = httpMocks.createResponse() as unknown as CustomResponseData<
        Member[]
      >;
      const next = vi.fn() as NextFunction;

      memberService.getByEventId.mockResolvedValue(members);

      const mockHttpResponse =
        httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
      httpResponse.OK.mockReturnValue(mockHttpResponse);

      const result = await getMembersByEvent(req, res, next);

      expect(memberService.getByEventId).toHaveBeenCalledWith(eventId);
      expect(httpResponse.OK).toHaveBeenCalledWith(res, members);
      expect(result).toBe(mockHttpResponse);
    });
  });

  describe("Update Member", () => {
    it("Should update and return the updated member", async () => {
      const memberId = "member1";
      const updateData = { name: "Updated Name" };
      const updatedMember: Member = {
        id: memberId,
        name: "Updated Name",
        eventId: "event1",
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const req = httpMocks.createRequest({
        method: "PUT",
        url: `/members/${memberId}`,
        params: { id: memberId },
        body: updateData,
      }) as Request<
        { id: string },
        unknown,
        Partial<Omit<Member, "id" | "createdAt" | "updatedAt">>
      >;

      const res =
        httpMocks.createResponse() as unknown as CustomResponseData<Member>;
      const next = vi.fn() as NextFunction;

      memberService.update.mockResolvedValue(updatedMember);

      const mockHttpResponse =
        httpMocks.createResponse() as unknown as CustomResponseData<unknown>;
      httpResponse.OK.mockReturnValue(mockHttpResponse);

      const result = await updateMember(req, res, next);

      expect(memberService.update).toHaveBeenCalledWith(memberId, updateData);
      expect(httpResponse.OK).toHaveBeenCalledWith(res, updatedMember);
      expect(result).toBe(mockHttpResponse);
    });
  });

  describe("Delete Member", () => {
    it("Should delete a member and return no content", async () => {
      const memberId = "member1";
      const deletedMember: Member = {
        id: memberId,
        name: "John Doe",
        eventId: "event1",
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const req = httpMocks.createRequest({
        method: "DELETE",
        url: `/members/${memberId}`,
        params: { id: memberId },
      }) as Request<{ id: string }, unknown, unknown>;

      const res =
        httpMocks.createResponse() as unknown as CustomResponseMessage;
      const next = vi.fn() as NextFunction;

      memberService.delete.mockResolvedValue(deletedMember);

      const mockHttpResponse =
        httpMocks.createResponse() as unknown as CustomResponseMessage;
      httpResponse.NO_CONTENT.mockReturnValue(mockHttpResponse);

      const result = await deleteMember(req, res, next);

      expect(memberService.delete).toHaveBeenCalledWith(memberId);
      expect(httpResponse.NO_CONTENT).toHaveBeenCalledWith(res);
      expect(result).toBe(mockHttpResponse);
    });
  });
});
