import { marked, type RendererObject } from 'marked'
import matter from "gray-matter";

const renderer: RendererObject = {
    heading({ tokens, depth  }) {
        const text = tokens.map(token => token.raw).join('')
        const tag = `h${depth}`
        const classes: Record<number, string> = {
            1: 'text-3xl font-bold mt-8 mb-4',
            2: 'text-2xl font-semibold mt-6 mb-3',
            3: 'text-xl font-medium mt-4 mb-2',
        }
        return `<${tag} class="${classes[depth] || 'text-lg'}">${text}</${tag}>`
    }
    ,
    paragraph({ text }) {
        return `<p class="text-base leading-relaxed mb-4">${text}</p>`
    },
    list({ items, ordered })  {
        const body = items.join('')
        const tag = ordered ? 'ol' : 'ul'
        const className = ordered
            ? 'list-decimal list-inside mb-4'
            : 'list-disc list-inside mb-4'
        return `<${tag} class="${className}">${body}</${tag}>`
    }
}

export async function parseMarkdown(source: string) {
    const { content, data } = matter(source)
    const html = await marked.parse(content)
    return { html, meta: data }
}

marked.use({ renderer })
