import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import type { httpResponse as HttpResponse } from "@/shared/libs/httpResponse";

beforeEach(() => {
  mockReset(httpResponse);
});

const httpResponse = mockDeep<typeof HttpResponse>();
export { httpResponse };
