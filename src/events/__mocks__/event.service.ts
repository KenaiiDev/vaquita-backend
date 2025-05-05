import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import type { eventService as Service } from "@/events/event.service";

const eventService = mockDeep<typeof Service>();

beforeEach(() => {
  mockReset(eventService);
});

export { eventService };
