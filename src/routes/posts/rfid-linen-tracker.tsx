import { Title } from "@solidjs/meta";
import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";

export default function Post() {
  return (
    <>
      <Title>RFID Linen Tracker</Title>
      <Navbar/>
      <article class="mt-2 mx-auto mb-4 px-3 md:px-16 min-h-screen prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <div innerHTML={`<p>Tech Stack: Solid.js, TanStack Query &amp; Table, TanStack Router, TailwindCSS, TCP/IP &amp; Plug-n-Play RFID Devices</p>
<h2>Overview</h2>
<p>RFID Linen Tracker adalah sistem full web-based untuk memonitor linen secara real-time menggunakan RFID devices. Sistem ini mendukung mode Plug-n-Play dan TCP/IP, sehingga mudah diintegrasikan dengan berbagai perangkat. Data UID yang terbaca dari RFID kemudian dicocokkan secara otomatis dengan database, memastikan tracking akurat dan efisien.</p>
<h2>Key Features</h2>
<ul>
<li>🌐 Web-based interface menggunakan Solid.js dan TailwindCSS untuk UI yang cepat dan responsif.</li>
<li>📊 Data management &amp; visualization dengan TanStack Table &amp; Query untuk update realtime dan filtering data linen.</li>
<li>🔄 Flexible device connectivity: Plug-n-Play atau TCP/IP mode, mendukung berbagai jenis RFID reader.</li>
<li>🔍 Automatic UID matching: setiap UID dari perangkat dicek terhadap database untuk memastikan akurasi inventory.</li>
</ul>
<h2>Challenges &amp; Solutions</h2>
<p>Challenge: Sinkronisasi data real-time dari multiple RFID devices.
Solution: Menggunakan TanStack Query untuk polling &amp; caching data secara efisien.</p>
<p>Challenge: Menyajikan data dalam jumlah besar tanpa lag.
Solution: TanStack Table dengan virtual scrolling &amp; TailwindCSS untuk rendering cepat dan UI ringan.</p>
<h2>Outcome</h2>
<p>Sistem mempermudah tracking linen secara akurat dan cepat di skala besar.</p>
<p>Mendukung monitoring inventory real-time sehingga mengurangi kehilangan linen dan memaksimalkan efisiensi operasional.</p>
`} />
      </article>
      <Footer/>
    </>
  );
}
