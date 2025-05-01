import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths"; // Importar el plugin

export default defineConfig({
  plugins: [tsconfigPaths()], // Añadir el plugin
  test: {
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    globals: true,
    environment: "node",
  },
});
