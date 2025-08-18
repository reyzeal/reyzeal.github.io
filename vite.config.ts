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
      tailwindcss(),
      // {
      //     name: "hash-json-public",
      //     enforce: "post",
      //     apply: "build",
      //     generateBundle() {
      //         const publicDir = path.resolve(__dirname, "src/assets");
      //         const distDir = path.resolve(__dirname, "dist");
      //         const files = fs.readdirSync(publicDir).filter(f => f.endsWith(".json"));
      //
      //         for (const file of files) {
      //             const content = fs.readFileSync(path.join(publicDir, file));
      //             const hash = require("crypto").createHash("md5").update(content).digest("hex").slice(0, 8);
      //             const newName = file.replace(".json", `.${hash}.json`);
      //             fs.copyFileSync(path.join(publicDir, file), path.join(distDir, newName));
      //             console.log(`${file} → ${newName}`);
      //         }
      //     },
      // },
  ],
    build: {
      minify: "terser",
        terserOptions: {
          compress: {
              drop_console: true,
              drop_debugger: true,
          },
            mangle: true
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("solid-js")) return "solid";
                        if (id.includes("@solidjs/router")) return "solid-router";
                        if (id.includes("@tanstack/solid-query")) return "tanstack-query";
                        if (id.includes("solid-motionone")) return "motion";
                        if (id.includes("tailwindcss")) return "tailwind";
                        if (id.includes("@iconify-icon/solid")) return "iconify";
                        return "vendor"; // fallback untuk deps lain
                    }
                },
            },
        },
    },
})
