// TextGenerateEffect.tsx
import { For, createSignal, onMount, onCleanup } from "solid-js";
import { Motion } from "solid-motionone";

type TextGenerateEffectProps = {
    words: string;
    class?: string;
    filter?: boolean;
    duration?: number;   // durasi tiap kata
    step?: number;       // jeda antar kata (stagger manual)
    threshold?: number;  // berapa % element harus terlihat (0-1)
    triggerOnce?: boolean; // apakah animasi hanya jalan sekali
};

export default function TextGenerateEffect(props: TextGenerateEffectProps) {
    const [isVisible, setIsVisible] = createSignal(false);
    const [hasTriggered, setHasTriggered] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    const wordsArray = () => props.words.split(" ");
    const duration = () => props.duration ?? 0.5;
    const step = () => props.step ?? 0.2;
    const threshold = () => props.threshold ?? 0.1; // 10% terlihat
    const triggerOnce = () => props.triggerOnce ?? true;

    // Setup Intersection Observer
    onMount(() => {
        if (!containerRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!triggerOnce() || !hasTriggered()) {
                            setIsVisible(true);
                            setHasTriggered(true);
                        }
                    } else {
                        if (!triggerOnce()) {
                            setIsVisible(false);
                        }
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

    const shouldAnimate = () => isVisible() && (!triggerOnce() || !hasTriggered() || isVisible());

    return (
        <div
            ref={containerRef}
            class={`${props.class ?? "font-bold text-2xl leading-snug tracking-wide"}`}
        >
            <div class="mt-4">
                <div class="">
                    <For each={wordsArray()}>
                        {(word, i) => (
                            <Motion.span
                                initial={{
                                    opacity: 0,
                                    filter: props.filter === false ? "none" : "blur(10px)",
                                }}
                                animate={shouldAnimate() ? {
                                    opacity: 1,
                                    filter: props.filter === false ? "none" : "blur(0px)",
                                } : {
                                    opacity: 0,
                                    filter: props.filter === false ? "none" : "blur(10px)",
                                }}
                                transition={{
                                    duration: duration(),
                                    delay: shouldAnimate() ? i() * step() : 0,
                                }}
                                class=""
                            >
                                {word + " "}
                            </Motion.span>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}