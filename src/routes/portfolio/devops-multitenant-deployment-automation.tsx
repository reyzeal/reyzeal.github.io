import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";
import {For} from "solid-js";
import {TechsRecord} from "../../utils/techRecords.ts";
import {Icon} from "@iconify-icon/solid";

export default function Post() {
  const techs = ["typescript","bun","node.js","vite","docker","github"];
  const title = "Multi-Tenant Deployment Automation";
  const description = "Membangun automation pipeline untuk deployment project multi-tenant";
  const tags = ["portfolio"];
  return (
    <>
      <Title>Multi-Tenant Deployment Automation</Title>
      <Navbar/>
      <article class="mt-2 py-4 mx-auto mb-4 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <a href={"/portfolio"} class={"flex items-center cursor-pointer gap-2 !no-underline !text-sky-600"}>
            <Icon icon={"mingcute:left-fill"} width={20}/>
            <p>Back to Portfolio</p>
        </a>
        <h1>Multi-Tenant Deployment Automation</h1>
        <p>Published: 18 days ago</p>
        <div class={"flex flex-wrap justify-center items-center gap-2 my-5"}>
                            <For each={techs}>
                                {tech => TechsRecord[tech]?.icon?<Icon icon={TechsRecord[tech]?.icon} width={20} class={""}/>:tech}
                            </For>
                        </div>
        <hr/>
        <div innerHTML={`<p>Tech Stack: CI/CD (GitHub Actions), Docker, Environment Config Management</p>
<h2>Overview:</h2>
<p>Saya membangun automation pipeline untuk deployment project multi-tenant. Setiap kali frontend selesai dikembangkan dan versi baru dirilis, sistem meng-compile frontend per tenant environment secara otomatis, memastikan konfigurasi khusus tenant tetap konsisten dan mengurangi human error.</p>
<h2>Key Features:</h2>
<ul>
<li>⚙️ Automated frontend compilation per tenant untuk release baru.</li>
<li>🐳 Dockerized build &amp; deployment untuk lingkungan yang konsisten.</li>
<li>🔄 CI/CD pipeline mengotomatisasi proses build, test, dan deploy.</li>
<li>🔒 Environment-specific configuration tanpa mengganggu tenant lain.</li>
</ul>
<h2>Challenges &amp; Solutions</h2>
<p>Challenge: Menjamin konsistensi environment untuk banyak tenant.
Solution: Automation pipeline + Docker + environment config management.</p>
<p>Challenge: Mengurangi human error saat deployment multi-tenant.
Solution: Full CI/CD automation yang otomatis compile &amp; deploy.</p>
<h2>Outcome</h2>
<ul>
<li>Mempercepat proses release hingga 70%.</li>
<li>Menjamin consistency dan reliability di tiap tenant environment.</li>
<li>Mengurangi risiko misconfiguration dan downtime.</li>
</ul>
`} />
        
        <a href={"/portfolio"} class={"flex items-center cursor-pointer gap-2 !no-underline !text-sky-600"}>
            <Icon icon={"mingcute:left-fill"} width={20}/>
            <p>Back to Portfolio</p>
        </a>
        
      </article>
      
      <Footer/>
    </>
  );
}
