import {Motion} from "solid-motionone";
import {createSignal, onCleanup, onMount} from "solid-js";

export function WorkExperience() {
    const [isShow, setIsShow] = createSignal(false);
    let ref : HTMLDivElement | undefined;
    onMount(() => {
        if(!ref) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries && entries.length > 0) {
                entries.forEach(entry => {
                    setIsShow(entry.isIntersecting);
                })
            }
        },{
            threshold: 0.2,
            rootMargin: "0px",
        })
        observer.observe(ref);
        onCleanup(() => {
            observer.disconnect();
        })
    })

    const works = [
        {place:"PT. Tritama Hasil Karya Bersama", title:"Senior Software Engineer", duration: "Yogyakarta, Remote | Full Time | 2023-Present"},
        {place:"Shinery Aesthetic", title:"Software Engineer", duration: "Salatiga, Remote | Part Time | 2022-2023"},
        {place:"IPiring.com", title:"CTO", duration: "Yogyakarta | Full Time | 2022-2023"},
        {place:"IPiring.com", title:"Backend Developer", duration: "Yogyakarta, Remote | Full Time | 2020-2022"},
        {place:"Freelancer", title:"Web Developer & Server Admin", duration: "Worldwide, Online | Full Time | 2019-2020"},
    ];

    return (
        <div class="w-full px-12 md:px-32 py-5 flex flex-col gap-4 justify-center items-center" ref={ref}>
            <Motion.h2
                class="font-semibold text-center text-3xl mb-8"
                initial={{opacity:0}}
                animate={isShow()?{opacity:1}:{opacity:0}}
                transition={{duration:1}}
            >
                Work Experience
            </Motion.h2>

            <ul class="relative w-full max-w-md">
                {works.map((work, index) => (
                    <Motion.li
                        class={`relative ${index < works.length -1?"border-l border-gray-300":""} pl-6`}
                        initial={{opacity:0}}
                        animate={isShow()?{opacity:1}:{opacity:0}}
                        transition={{duration:1, delay:index*0.3}}
                    >
                        {/* dot */}
                        <span class="absolute -translate-[250%] translate-y-1/2 flex items-center justify-center w-3 h-3 bg-gray-300 rounded-full ring-6 ring-white"></span>
                        {/* content */}
                        <div class="flex flex-col pb-5 w-full">
                            <h4 class="text-sm text-gray-800">{work.place} - <span class={"font-semibold underline"}>{work.title}</span></h4>
                            <p class={"text-muted-foreground text-justify text-xs"}>{work.duration}</p>
                        </div>
                    </Motion.li>
                ))}
            </ul>
        </div>
    );
}
