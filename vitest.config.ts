import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    globals: true,
    environment: "node",
  },
});
