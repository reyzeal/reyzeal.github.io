import TextGenerateEffect from "./TextGenerateEffect.tsx";
import Divider from "./Divider.tsx";
import {createSignal, onCleanup, onMount} from "solid-js";
import { Motion } from "solid-motionone";

export function About() {
    let containerRef: HTMLDivElement | undefined;
    const [isVisible, setIsVisible] = createSignal(false);
    const [animated, setAnimated] = createSignal(false);
    const threshold = () => 0.1; // 10% terlihat
    onMount(() => {
        if (!containerRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: threshold(),
                rootMargin: "0px"
            }
        );

        observer.observe(containerRef);

        onCleanup(() => {
            observer.disconnect();
        });
    });
    const shouldAnimate = () => isVisible() || !animated();
    return <>
        <div id={"about"} class={"w-full bg-sky-600 text-white relative"}>
            <Divider color={"#FFF"} class={"w-full translate-y-[-1px]"} flip={true}/>
            <div class={"flex flex-wrap w-full items-center justify-center p-12 md:px-32 md:pb-32 gap-4"}>
                <div ref={containerRef} class={"w-[200px]"}>
                    {/*<ImageFlip frontImage={"/rizal.jpeg"} backImage={"/rizal.jpeg"} triggerOnce={false} trigger={"hover"} direction={"horizontal"} />*/}
                    <Motion.img onMotionComplete={() => setAnimated(true)} initial={{opacity:0}} animate={{opacity:shouldAnimate()?1:0}} transition={{delay:0.3, duration:1}} src={"/rizal.jpeg"} class={"p-0 w-full bg-white rounded-md shadow-md"}/>
                </div>
                <div class={"max-w-md prose-sky mb-5 md:mb-0"}>
                    <h2 class="font-semibold text-3xl mb-5">About Me</h2>
                    <TextGenerateEffect duration={0.5} step={0.02}  words={"Hi, I’m Rizal — a software engineer and full-stack developer who loves building things end-to-end, from backend services in Rust or Go to sleek frontends with Solid and Tailwind. I enjoy experimenting with new tools and architectures, always looking for ways to write cleaner, faster, and more reliable code. For me, coding isn’t just work, it’s also the fun part of turning ideas into something real and useful."} class={"text-lg leading-relaxed text-justify"}></TextGenerateEffect>
                </div>
            </div>
            <Divider color={"#FFF"} class={"w-full absolute bottom-[-1px]"}/>
        </div>
    </>
}