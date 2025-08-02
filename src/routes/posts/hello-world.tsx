import { Title } from "@solidjs/meta";

export default function Post() {
  return (
    <>
      <Title>Hello Markdown</Title>
      <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={`<h1>Welcome</h1>
<p>This is <strong>Markdown</strong> rendered with TailwindCSS styles.</p>
<ul>
<li>Point one</li>
<li>Point two</li>
</ul>
`} />
      </article>
    </>
  );
}
