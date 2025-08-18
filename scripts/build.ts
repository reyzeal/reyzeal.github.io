import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.resolve(__dirname,'../posts')
const routesDir = path.resolve(__dirname,'../src/routes/posts')
let database: { slug: string; title: any; description: any; tags: any; tech: any }[] = [];
let portfolio: { slug: string; title: any; description: any; tags: any; tech: any }[] = [];
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
        if(data.tags && data.tags.length > 0 && data.tags.includes('portfolio')) {
            portfolio.push({
                slug: slug,
                title: data.title,
                description: data.description ?? "",
                tags: data.tags ?? [],
                tech: data.tech || [],
            })
        }
        database.push({
            slug: slug,
            title: data.title,
            description: data.description ?? "",
            tags: data.tags ?? [],
            tech: data.tech || [],
        })

        const tsx = `\
import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";

export default function Post() {
  return (
    <>
      <Title>${data.title || slug}</Title>
      <Navbar/>
      <article class="mt-2 mx-auto mb-4 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={\`${html.replace(/`/g, '\\`')}\`} />
      </article>
      <Footer/>
    </>
  );
}
`

        fs.writeFileSync(routePath, tsx, 'utf-8')
        console.log(`✅ Generated ${slug}.tsx`)
    }

    fs.writeFileSync(path.join(path.resolve("public"), "posts.json"), JSON.stringify(database, null, 2))
    fs.writeFileSync(path.join(path.resolve("public"), "portfolio.json"), JSON.stringify(portfolio, null, 2))
}

build()