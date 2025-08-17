import Hero from "../components/Hero.tsx";
import Navbar from "../components/Navbar.tsx";
import {Footer} from "../components/Footer.tsx";
import {About} from "../components/About.tsx";
import { Portfolio } from "../components/Portfolio.tsx";
import { Contact } from "../components/Contact.tsx";
import {WorkExperience} from "../components/WorkExperience.tsx";
import {TechStack} from "../components/TechStack.tsx";
import {Blog} from "../components/Blog.tsx";

export default function (){
    // const content = [
    //     {
    //         title: "Judul Pertama",
    //         description: "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    //         content: <div>Konten pertama</div>
    //     },
    //     {
    //         title: "Judul Kedua",
    //         description: "Deskripsi kedua...",
    //         content: <div class={"bg-background"}>
    //             <img class={"w-1/2"} src="/face1.png" alt="example" />
    //         </div>
    //     }
    // ];
    return <>
        <Navbar />
        <Hero/>
        <About/>
        <WorkExperience/>
        <TechStack/>
        <Portfolio/>
        {/*<StickyScroll*/}
        {/*    content={content}*/}
        {/*    contentClassName="custom-content-class"*/}
        {/*    class="custom-container-class"*/}
        {/*/>*/}
        <Blog/>
        <Contact/>
        <Footer/>
    </>
}