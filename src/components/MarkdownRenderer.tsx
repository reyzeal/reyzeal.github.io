// src/components/MarkdownRenderer.tsx
export default function MarkdownRenderer(props: { html: string }) {
    return (
        <div class="prose prose-sm md:prose lg:prose-lg dark:prose-invert max-w-none">
            <div innerHTML={props.html} />
        </div>
    )
}
