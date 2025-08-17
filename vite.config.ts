import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'
import md from 'vite-plugin-md'

export default defineConfig({
  plugins: [
      solid(),
      md(),
      Pages({
          dirs: [
              {dir: "src/routes", baseRoute:""}
          ],
          resolver: "solid",
          extensions: ['tsx', 'md'],
      }),
      tailwindcss()
  ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("solid-js")) return "solid";
                        if (id.includes("@solidjs/router")) return "solid-router";
                        if (id.includes("@tanstack/solid-query")) return "tanstack-query";
                        if (id.includes("solid-motionone")) return "motion";
                        if (id.includes("tailwindcss")) return "tailwind";
                        return "vendor"; // fallback untuk deps lain
                    }
                },
            },
        },
    },
})
