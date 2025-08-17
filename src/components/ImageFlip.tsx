// ImageFlip.tsx
import { createSignal, type JSX, onMount, onCleanup } from "solid-js";
import { Motion } from "solid-motionone";

export type FlipDirection = 'horizontal' | 'vertical' | 'diagonal';
export type FlipTrigger = 'hover' | 'click' | 'viewport' | 'auto';

export interface ImageFlipProps {
    // Content props
    frontContent?: JSX.Element;
    backContent?: JSX.Element;
    frontImage?: string;
    backImage?: string;

    // Animation props
    direction?: FlipDirection;
    trigger?: FlipTrigger;
    duration?: number;
    autoInterval?: number; // untuk auto flip (ms)

    // Style props
    class?: string;
    width?: string;
    height?: string;
    borderRadius?: string;

    // Viewport props (jika trigger = 'viewport')
    threshold?: number;
    triggerOnce?: boolean;

    // Callbacks
    onFlip?: (isFlipped: boolean) => void;
    onClick?: () => void;
}

export default function ImageFlip(props: ImageFlipProps) {
    const [isFlipped, setIsFlipped] = createSignal(false);
    const [_, setIsVisible] = createSignal(false);
    const [hasTriggered, setHasTriggered] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;
    let autoInterval: NodeJS.Timeout;

    // Default values
    const direction = () => props.direction ?? 'horizontal';
    const trigger = () => props.trigger ?? 'hover';
    const duration = () => props.duration ?? 0.6;
    const autoIntervalMs = () => props.autoInterval ?? 3000;
    const threshold = () => props.threshold ?? 0.1;
    const triggerOnce = () => props.triggerOnce ?? true;
    const width = () => props.width ?? 'w-80';
    const height = () => props.height ?? 'h-64';
    const borderRadius = () => props.borderRadius ?? 'rounded-xl';

    // Setup viewport observer
    onMount(() => {
        if (trigger() === 'viewport' && containerRef) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (!triggerOnce() || !hasTriggered()) {
                                setIsVisible(true);
                                setHasTriggered(true);
                                handleFlip(true);
                            }
                        } else {
                            if (!triggerOnce()) {
                                setIsVisible(false);
                                handleFlip(false);
                            }
                        }
                    });
                },
                { threshold: threshold() }
            );
            observer.observe(containerRef);

            onCleanup(() => observer.disconnect());
        }

        // Setup auto flip
        if (trigger() === 'auto') {
            autoInterval = setInterval(() => {
                handleFlip(!isFlipped());
            }, autoIntervalMs());

            onCleanup(() => {
                if (autoInterval) clearInterval(autoInterval);
            });
        }
    });

    const handleFlip = (flip?: boolean) => {
        const newFlipped = flip !== undefined ? flip : !isFlipped();
        setIsFlipped(newFlipped);
        props.onFlip?.(newFlipped);
    };

    const handleClick = () => {
        if (trigger() === 'click') {
            handleFlip();
        }
        props.onClick?.();
    };

    const handleMouseEnter = () => {
        if (trigger() === 'hover') {
            handleFlip(true);
        }
    };

    const handleMouseLeave = () => {
        if (trigger() === 'hover') {
            handleFlip(false);
        }
    };

    // Get rotation based on direction
    const getRotation = () => {
        if (!isFlipped()) return { rotateX: 0, rotateY: 0, rotateZ: 0 };

        switch (direction()) {
            case 'vertical':
                return { rotateX: 180, rotateY: 0, rotateZ: 0 };
            case 'diagonal':
                return { rotateX: 180, rotateY: 180, rotateZ: 0 };
            default: // horizontal
                return { rotateX: 0, rotateY: 180, rotateZ: 0 };
        }
    };

    const getBackRotation = () => {
        switch (direction()) {
            case 'vertical':
                return 'rotateX(180deg)';
            case 'diagonal':
                return 'rotate3d(1, 1, 0, 180deg)';
            default: // horizontal
                return 'rotateY(180deg)';
        }
    };

    const baseClasses = `
        ${width()} ${height()} ${borderRadius()} 
        perspective-1000 cursor-pointer relative overflow-hidden
        shadow-xl hover:shadow-2xl transition-shadow duration-300
        ${props.class ?? ''}
    `;

    return (
        <div
            ref={containerRef}
            class={baseClasses}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Motion.div
                class="relative w-full h-full preserve-3d"
                animate={getRotation()}
                transition={{ duration: duration(), easing: "ease-in-out" }}
            >
                {/* Front Side */}
                <div class={`
                    absolute inset-0 ${borderRadius()} backface-hidden
                    flex items-center justify-center
                `}>
                    {props.frontImage ? (
                        <img
                            src={props.frontImage}
                            alt="Front"
                            class={`w-full h-full object-cover ${borderRadius()}`}
                        />
                    ) : (
                        <div class={`
                            w-full h-full ${borderRadius()}
                            bg-gradient-to-br from-blue-500 to-purple-600
                            flex items-center justify-center text-white font-bold text-lg
                        `}>
                            {props.frontContent ?? "Front Side"}
                        </div>
                    )}
                </div>

                {/* Back Side */}
                <div
                    class={`
                        absolute inset-0 ${borderRadius()} backface-hidden
                        flex items-center justify-center
                    `}
                    style={{ transform: getBackRotation() }}
                >
                    {props.backImage ? (
                        <img
                            src={props.backImage}
                            alt="Back"
                            class={`w-full h-full object-cover ${borderRadius()}`}
                        />
                    ) : (
                        <div class={`
                            w-full h-full ${borderRadius()}
                            bg-gradient-to-br from-emerald-500 to-teal-600
                            flex items-center justify-center text-white font-bold text-lg
                        `}>
                            {props.backContent ?? "Back Side"}
                        </div>
                    )}
                </div>
            </Motion.div>
        </div>
    );
}

// Preset components untuk kemudahan
export function ImageFlipCard(props: Omit<ImageFlipProps, 'trigger' | 'direction'>) {
    return (
        <ImageFlip
            {...props}
            trigger="hover"
            direction="horizontal"
            class={`transition-transform hover:scale-105 ${props.class ?? ''}`}
        />
    );
}

export function ImageFlipAutoCard(props: Omit<ImageFlipProps, 'trigger'>) {
    return (
        <ImageFlip
            {...props}
            trigger="auto"
            class={`animate-pulse ${props.class ?? ''}`}
        />
    );
}

export function ImageFlipViewportCard(props: Omit<ImageFlipProps, 'trigger'>) {
    return (
        <ImageFlip
            {...props}
            trigger="viewport"
            threshold={0.3}
            triggerOnce={true}
        />
    );
}