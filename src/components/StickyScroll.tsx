import { createSignal, createEffect, onMount, type JSX } from 'solid-js';
import { Motion } from 'solid-motionone';

export interface StickyScrollContent {
    title: string;
    description: string;
    content?: JSX.Element;
}

export interface StickyScrollProps {
    content: StickyScrollContent[];
    contentClassName?: string;
    class?: string;
}

// Utility function untuk menggabungkan className (seperti cn dari lib/utils)
const cn = (...classes: (string | undefined | false | null)[]): string => {
    return classes.filter(Boolean).join(' ');
};

export const StickyScroll = (props: StickyScrollProps) => {
    const [activeCard, setActiveCard] = createSignal(0);
    const [_, setBackgroundGradient] = createSignal('');
    let containerRef: HTMLDivElement | undefined;
    let scrollListener: (() => void) | undefined;

    const backgroundColors = [
        '#0f172a', // slate-900
        '#000000', // black
        '#171717', // neutral-900
    ];

    const linearGradients = [
        'linear-gradient(to bottom right, #06b6d4, #10b981)', // cyan-500 to emerald-500
        'linear-gradient(to bottom right, #ec4899, #6366f1)', // pink-500 to indigo-500
        'linear-gradient(to bottom right, #f97316, #eab308)', // orange-500 to yellow-500
    ];

    const handleScroll = () => {
        if (!containerRef) return;

        const scrollTop = containerRef.scrollTop;
        const scrollHeight = containerRef.scrollHeight - containerRef.clientHeight;
        const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        const cardLength = props.content.length;
        const cardsBreakpoints = props.content.map((_, index) => index / cardLength);

        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(scrollProgress - breakpoint);
                if (distance < Math.abs(scrollProgress - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );

        setActiveCard(closestBreakpointIndex);
    };

    // Set initial background gradient
    createEffect(() => {
        setBackgroundGradient(linearGradients[0]);
    });

    // Update background gradient when active card changes
    createEffect(() => {
        const currentActive = activeCard();
        setBackgroundGradient(linearGradients[currentActive % linearGradients.length]);
    });

    onMount(() => {
        if (containerRef) {
            scrollListener = () => handleScroll();
            containerRef.addEventListener('scroll', scrollListener);
        }
    });

    // Cleanup scroll listener
    createEffect(() => {
        return () => {
            if (containerRef && scrollListener) {
                containerRef.removeEventListener('scroll', scrollListener);
            }
        };
    });

    return (
        <Motion.div
            ref={containerRef}
            animate={{
                backgroundColor: backgroundColors[activeCard() % backgroundColors.length]
            }}
            transition={{ duration: 0.3 }}
            class={cn(
                'relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10',
                props.class
            )}
        >
            <div class="div relative flex items-start px-4">
                <div class="max-w-11/12">
                    {props.content.map((item, index) => (
                        <div class="my-20">
                            <Motion.h2
                                animate={{
                                    opacity: activeCard() === index ? 1 : 0.3
                                }}
                                transition={{ duration: 0.3 }}
                                class="text-2xl font-bold text-slate-100"
                            >
                                {item.title}
                            </Motion.h2>
                            <Motion.p
                                animate={{
                                    opacity: activeCard() === index ? 1 : 0.3
                                }}
                                transition={{ duration: 0.3 }}
                                class="text-kg mt-10 max-w-xs text-slate-300"
                            >
                                {item.description}
                            </Motion.p>
                        </div>
                    ))}
                    <div class="h-40" />
                </div>
            </div>
            <div
                // style={{
                //     background: backgroundGradient()
                // }}
                class={cn(
                    'sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md lg:block',
                    props.contentClassName
                )}
            >
                {props.content[activeCard()]?.content ?? null}
            </div>
        </Motion.div>
    );
};