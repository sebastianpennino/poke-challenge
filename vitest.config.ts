/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
    include: ["./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    watchExclude: [
      ".*\\/node_modules\\/.*",
      ".*\\/build\\/.*",
      ".*\\/postgres-data\\/.*",
    ],
  },
});


// import { vitePlugin as remix } from '@remix-run/dev';
// import { installGlobals } from '@remix-run/node';

// installGlobals();

// export default defineConfig({
//   plugins: [react(), remix(), tsconfigPaths()],
//   server: {
//     host: true
//   },
//   test: {
//     globals: true,
//     environment: "happy-dom",
//     setupFiles: ["./test/setup-test-env.ts"],
//     include: ["./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
//     watchExclude: [
//       ".*\\/node_modules\\/.*",
//       ".*\\/build\\/.*",
//       ".*\\/postgres-data\\/.*",
//     ],
//   },
// });
