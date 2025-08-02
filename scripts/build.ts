import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.resolve(__dirname,'../posts')
const routesDir = path.resolve(__dirname,'../src/routes/posts')

// Pastikan folder tujuan ada
async function build() {
    fs.mkdirSync(routesDir, { recursive: true })

    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))


    for (const file of files) {
        const filePath = path.join(postsDir, file)
        const slug = path.basename(file, '.md')
        const routePath = path.join(routesDir, `${slug}.tsx`)

        const source = fs.readFileSync(filePath, 'utf-8')
        const { content, data } = matter(source)
        const html = await marked.parse(content)

        const tsx = `\
import { Title } from "@solidjs/meta";

export default function Post() {
  return (
    <>
      <Title>${data.title || slug}</Title>
      <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={\`${html.replace(/`/g, '\\`')}\`} />
      </article>
    </>
  );
}
`

        fs.writeFileSync(routePath, tsx, 'utf-8')
        console.log(`✅ Generated ${slug}.tsx`)
    }
}

build()