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
})
