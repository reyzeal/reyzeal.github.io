import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import moment from "moment";

const postsDir = path.resolve(__dirname,'../posts')
const routesPostDir = path.resolve(__dirname,'../src/routes/posts')
const routesPortDir = path.resolve(__dirname,'../src/routes/portfolio')
let database: { slug: string; title: any; description: any; tags: any; tech: any }[] = [];
let portfolio: { slug: string; title: any; description: any; tags: any; tech: any }[] = [];
// Pastikan folder tujuan ada
async function build() {
    fs.mkdirSync(routesPostDir, { recursive: true })
    fs.mkdirSync(routesPortDir, { recursive: true })

    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))


    for (const file of files) {
        const filePath = path.join(postsDir, file)
        const slug = path.basename(file, '.md')
        let routePath = path.join(routesPostDir, `${slug}.tsx`)


        const source = fs.readFileSync(filePath, 'utf-8')
        const { content, data } = matter(source)
        const html = await marked.parse(content)
        let back = "/posts/";
        if(data.tags && data.tags.length > 0 && data.tags.includes('portfolio')) {
            routePath = path.join(routesPortDir, `${slug}.tsx`)
            portfolio.push({
                slug: slug,
                title: data.title,
                description: data.description ?? "",
                tags: data.tags ?? [],
                tech: data.tech || [],
                ...data
            })
            back = "/portfolio/"
        }else{
            database.push({
                slug: slug,
                title: data.title,
                description: data.description ?? "",
                tags: data.tags ?? [],
                tech: data.tech || [],
                ...data
            })
        }


        const tsx = `\
import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";
import {For} from "solid-js";
import {TechsRecord} from "../../utils/techRecords.ts";
import {Icon} from "@iconify-icon/solid";

export default function Post() {
  const techs = ${JSON.stringify(data.tech ?? [])};
  const title = "${data.title}";
  const description = "${data.description ?? ""}";
  const tags = ${JSON.stringify(data.tags ?? [])};
  return (
    <>
      <Title>${data.title || slug}</Title>
      <Navbar/>
      <article class="mt-2 py-4 mx-auto mb-4 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <a href={"/portfolio"} class={"flex items-center cursor-pointer gap-2 !no-underline !text-sky-600"}>
            <Icon icon={"mingcute:left-fill"} width={20}/>
            <p>Back to Portfolio</p>
        </a>
        <h1>${data.title}</h1>
        <p>Published: ${moment(data.date,"YYYY-MM-DD").fromNow()}</p>
        <div class={"flex flex-wrap justify-center items-center gap-2 my-5"}>
                            <For each={techs}>
                                {tech => TechsRecord[tech]?.icon?<Icon icon={TechsRecord[tech]?.icon} width={20} class={""}/>:tech}
                            </For>
                        </div>
        <hr/>
        <div innerHTML={\`${html.replace(/`/g, '\\`')}\`} />
        
        <a href={"/portfolio"} class={"flex items-center cursor-pointer gap-2 !no-underline !text-sky-600"}>
            <Icon icon={"mingcute:left-fill"} width={20}/>
            <p>Back to Portfolio</p>
        </a>
        
      </article>
      
      <Footer/>
    </>
  );
}
`

        fs.writeFileSync(routePath, tsx, 'utf-8')
        console.log(`✅ Generated ${slug}.tsx`)
    }

    fs.writeFileSync(path.join(path.resolve("src/assets"), "posts.json"), JSON.stringify(database, null, 2))
    fs.writeFileSync(path.join(path.resolve("src/assets"), "portfolio.json"), JSON.stringify(portfolio, null, 2))
}

build()