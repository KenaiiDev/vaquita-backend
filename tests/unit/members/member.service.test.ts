import { expect, vi, it, describe, beforeEach } from "vitest";
import { memberService } from "@/members/member.service";
import type {
  CreateMemberDto,
  Member,
  UpdateMemberDto,
} from "@/members/member.types";
import prisma from "@/shared/libs/__mocks__/prismaClient";

vi.mock("@/shared/libs/prismaClient");

const createMockMember = (
  id: string,
  overrides: Partial<Member> = {}
): Member => {
  const now = new Date();
  return {
    id,
    name: `Member ${id}`,
    eventId: `mockEventId-${id}`,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
};

describe("Member Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Create method", () => {
    it("Should return the generated member", async () => {
      const mockEventId = "21hgjrhslghjl42hl13";
      const mockedData: CreateMemberDto = {
        name: "John",
        eventId: mockEventId,
      };
      const mockedMember = createMockMember("1", mockedData);

      prisma.member.create.mockResolvedValue(mockedMember);

      const member = await memberService.create(mockedData);
      expect(prisma.member.create).toHaveBeenCalledWith({ data: mockedData });
      expect(member).toStrictEqual(mockedMember);
    });
  });

  describe("findById method", () => {
    it("Should return the member if found", async () => {
      const memberId = "member1";
      const mockedMember = createMockMember(memberId);
      prisma.member.findUnique.mockResolvedValue(mockedMember);

      const member = await memberService.getById(memberId);

      expect(prisma.member.findUnique).toHaveBeenCalledWith({
        where: { id: memberId },
      });
      expect(member).toStrictEqual(mockedMember);
    });

    it("Should return null if member not found", async () => {
      const memberId = "nonExistentMember";
      prisma.member.findUnique.mockResolvedValue(null);

      const member = await memberService.getById(memberId);

      expect(prisma.member.findUnique).toHaveBeenCalledWith({
        where: { id: memberId },
      });
      expect(member).toBeNull();
    });
  });

  describe("findAll method", () => {
    it("Should return all members for a given eventId", async () => {
      const eventId = "event1";
      const mockedMembers = [
        createMockMember("member1", { eventId }),
        createMockMember("member2", { eventId }),
      ];
      prisma.member.findMany.mockResolvedValue(mockedMembers);

      const members = await memberService.getAll(eventId);

      expect(prisma.member.findMany).toHaveBeenCalledWith({
        where: { eventId },
      });
      expect(members).toStrictEqual(mockedMembers);
      expect(members.length).toBe(2);
    });

    it("Should return an empty array if no members found for the eventId", async () => {
      const eventId = "eventWithNoMembers";
      prisma.member.findMany.mockResolvedValue([]);

      const members = await memberService.getAll(eventId);

      expect(prisma.member.findMany).toHaveBeenCalledWith({
        where: { eventId },
      });
      expect(members).toStrictEqual([]);
    });
  });

  describe("Update method", () => {
    it("Should return the updated member", async () => {
      const memberId = "memberToUpdate";
      const updateData: UpdateMemberDto = { name: "Updated Name" };
      const originalMember = createMockMember(memberId);
      const updatedMember = {
        ...originalMember,
        ...updateData,
        updatedAt: new Date(),
      };

      prisma.member.findUnique.mockResolvedValue(originalMember);
      prisma.member.update.mockResolvedValue(updatedMember);

      const member = await memberService.update(memberId, updateData);

      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { id: memberId },
        data: updateData,
      });
      expect(member).toStrictEqual(updatedMember);
      expect(member.name).toBe("Updated Name");
    });

    it("Should throw an error if member to update is not found", async () => {
      const memberId = "nonExistentMember";
      const updateData: UpdateMemberDto = { name: "Updated Name" };

      // Simulate member not found during update
      prisma.member.update.mockRejectedValue(new Error("Member not found"));

      await expect(
        memberService.update(memberId, updateData)
      ).rejects.toThrow();

      expect(prisma.member.update).toHaveBeenCalledWith({
        where: { id: memberId },
        data: updateData,
      });
    });
  });

  describe("Remove method", () => {
    it("Should return the removed member", async () => {
      const memberId = "memberToRemove";
      const mockedMember = createMockMember(memberId);
      prisma.member.delete.mockResolvedValue(mockedMember);

      const member = await memberService.delete(memberId);

      expect(prisma.member.delete).toHaveBeenCalledWith({
        where: { id: memberId },
      });
      expect(member).toStrictEqual(mockedMember);
    });

    it("Should throw an error if member to remove is not found", async () => {
      const memberId = "nonExistentMember";

      prisma.member.delete.mockRejectedValue(new Error("Member not found"));

      await expect(memberService.delete(memberId)).rejects.toThrow();

      expect(prisma.member.delete).toHaveBeenCalledWith({
        where: { id: memberId },
      });
    });
  });
});
