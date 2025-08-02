///  <reference types="vite-plugin-pages/client-solid" />
declare module '*.md?raw' {
    const content: string
    export default content
}