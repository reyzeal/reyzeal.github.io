import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";

export default function Post() {
  return (
    <>
      <Title>Hello Markdown</Title>
      <Navbar/>
      <article class="mt-2 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={`<h1>Welcome</h1>
<p>This is <strong>Markdown</strong> rendered with TailwindCSS styles.</p>
<ul>
<li>Point one</li>
<li>Point two</li>
</ul>
`} />
      </article>
      <Footer/>
    </>
  );
}
