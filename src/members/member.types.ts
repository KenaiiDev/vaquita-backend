import { Member as PrismaMember } from "@prisma/client";

export type Member = PrismaMember;
export type MemberId = Member["id"];

export type CreateMemberDto = Omit<Member, "id" | "createdAt" | "updatedAt">;
export type UpdateMemberDto = Partial<
  Omit<Member, "id" | "createdAt" | "updatedAt">
>;
