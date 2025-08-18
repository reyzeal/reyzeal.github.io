// src/components/Hero.tsx
// src/components/Hero.tsx
import {type Component, createSignal, For, onCleanup, onMount} from "solid-js";
import Button, {ButtonVariant} from "./Button";
import TextGenerateEffect from "./TextGenerateEffect.tsx";

const Hero: Component = () => {
    const [counter, setCounter] = createSignal<NodeJS.Timeout>();
    const [image, setImage] = createSignal(0);
    onMount(() => {
        if(counter()) {
            return;
        }
        setCounter(setInterval(() => {
            setImage((image()+1) % 3)
        }, 500))

        onCleanup(() => {
            clearInterval(counter())
        })
    })
    return (
        <section class="relative z-0 flex flex-col bg-background text-foreground items-center justify-center text-center">
            {/* Background gradient */}
            <div class="absolute inset-0 -z-10 bg-gradient-to-b from-sky-200 to-white"></div>
            <div class="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
                <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                    Hi, I’m <span class="text-sky-600">Rizal</span>
                </h1>

                <p class="mt-6 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                    <TextGenerateEffect
                        words={"A passionate Software Engineer building scalable web applications and cloud solutions."}
                        class="text-center"
                        duration={1}
                        step={0.18}
                        triggerOnce={false}
                    />
                </p>

                {/* CTA Buttons */}
                <div class="mt-8 flex gap-4">
                    <Button variant={ButtonVariant.Primary} onClick={() => {
                        document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        View Portfolio
                    </Button>
                    <Button variant={ButtonVariant.Outline} onClick={() => {
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        Contact Me
                    </Button>
                </div>
                {/* Optional illustration */}
                <div class="mt-12">
                    <For each={["face1", "face2", "face3"]}>
                        {(x,i) => <img
                            src={`/${x}.png`}
                            alt="Hero illustration"
                            class={`max-w-xs mx-auto ${i() == image()?"w-[100px]":"w-0"}`}
                        />}
                    </For>
                </div>
            </div>
        </section>
    );
};

export default Hero;
