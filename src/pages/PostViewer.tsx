import { createResource } from 'solid-js'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { parseMarkdown } from '../utils/MarkdownParser.ts'

async function loadPost(slug: string) {
    const file = await import(`../../posts/${slug}.md?raw`)
    return parseMarkdown(file.default)
}

export default function PostViewer() {
    const [post] = createResource(() => 'hello', loadPost)

    return (
        <div class="p-4">
            {post.loading && <p>Loading...</p>}
            {post() && (
                <>
                    <h1 class="text-2xl font-bold mb-4">{post()?.meta.title}</h1>
                    <MarkdownRenderer html={post()!.html} />
                </>
            )}
        </div>
    )
}
