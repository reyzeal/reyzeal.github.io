import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";

export default function Post() {
  return (
    <>
      <Title>Multi-Tenant Deployment Automation</Title>
      <Navbar/>
      <article class="mt-2 mx-auto mb-4 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={`<p>Tech Stack: CI/CD (GitHub Actions / GitLab CI), Docker, Environment Config Management</p>
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
      </article>
      <Footer/>
    </>
  );
}
