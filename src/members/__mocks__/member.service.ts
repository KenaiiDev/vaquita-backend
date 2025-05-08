import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import type { memberService as Service } from "@/members/member.service";

const memberService = mockDeep<typeof Service>();

beforeEach(() => {
  mockReset(memberService);
});

export { memberService };
