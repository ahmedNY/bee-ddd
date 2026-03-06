import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["reflect-metadata"],
    include: [
      "src/**/__tests__/**/*.test.ts",
      "src/**/*.test.ts",
    ],
  },
});
