// imageFlipUtils.ts
import { createSignal, createEffect, onCleanup } from "solid-js";

// Utility types
export interface FlipConfig {
    direction: 'horizontal' | 'vertical' | 'diagonal';
    duration: number;
    autoInterval?: number;
    threshold?: number;
}

export interface FlipPreset {
    name: string;
    config: Partial<FlipConfig>;
    styles?: string;
}

// Predefined presets
export const FLIP_PRESETS: Record<string, FlipPreset> = {
    card: {
        name: 'Card',
        config: {
            direction: 'horizontal',
            duration: 0.6
        },
        styles: 'transition-transform hover:scale-105'
    },
    photo: {
        name: 'Photo',
        config: {
            direction: 'vertical',
            duration: 0.8
        },
        styles: 'shadow-2xl hover:shadow-purple-500/50'
    },
    tile: {
        name: 'Tile',
        config: {
            direction: 'diagonal',
            duration: 0.5
        },
        styles: 'rounded-lg border-2 border-white/20'
    },
    auto: {
        name: 'Auto',
        config: {
            direction: 'horizontal',
            duration: 0.4,
            autoInterval: 3000
        },
        styles: 'animate-pulse'
    }
};

// Custom hook for flip state management
export function createFlipState(initialState = false) {
    const [isFlipped, setIsFlipped] = createSignal(initialState);
    const [flipCount, setFlipCount] = createSignal(0);

    const flip = (state?: boolean) => {
        const newState = state !== undefined ? state : !isFlipped();
        setIsFlipped(newState);
        setFlipCount(prev => prev + 1);
        return newState;
    };

    const reset = () => {
        setIsFlipped(initialState);
        setFlipCount(0);
    };

    return {
        isFlipped,
        flipCount,
        flip,
        reset,
        toggle: () => flip(),
    };
}

// Custom hook for viewport detection
export function createViewportObserver(
    threshold = 0.1,
    rootMargin = "0px"
) {
    const [isIntersecting, setIsIntersecting] = createSignal(false);
    const [hasIntersected, setHasIntersected] = createSignal(false);

    const observe = (element: Element) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsIntersecting(entry.isIntersecting);
                    if (entry.isIntersecting && !hasIntersected()) {
                        setHasIntersected(true);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        onCleanup(() => {
            observer.disconnect();
        });

        return observer;
    };

    return {
        isIntersecting,
        hasIntersected,
        observe,
    };
}

// Custom hook for auto flip
export function createAutoFlip(interval = 3000, immediate = false) {
    const [isActive, setIsActive] = createSignal(immediate);
    const flipState = createFlipState();

    let intervalId: NodeJS.Timeout | undefined;

    const start = () => {
        if (intervalId) return;
        setIsActive(true);
        intervalId = setInterval(() => {
            flipState.toggle();
        }, interval);
    };

    const stop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
        setIsActive(false);
    };

    const toggle = () => {
        isActive() ? stop() : start();
    };

    createEffect(() => {
        if (immediate) start();
    });

    onCleanup(() => {
        if (intervalId) clearInterval(intervalId);
    });

    return {
        ...flipState,
        isActive,
        start,
        stop,
        toggle: toggle,
        restart: () => {
            stop();
            flipState.reset();
            start();
        }
    };
}

// Utility functions
export const flipUtils = {
    // Generate random flip direction
    randomDirection: (): 'horizontal' | 'vertical' | 'diagonal' => {
        const directions = ['horizontal', 'vertical', 'diagonal'] as const;
        return directions[Math.floor(Math.random() * directions.length)];
    },

    // Generate stagger delays for multiple cards
    generateStaggerDelays: (count: number, baseDelay = 0.1) => {
        return Array.from({ length: count }, (_, i) => i * baseDelay);
    },

    // Easing functions
    easings: {
        easeInOut: [0.4, 0.0, 0.2, 1],
        easeOut: [0.0, 0.0, 0.2, 1],
        easeIn: [0.4, 0.0, 1, 1],
        bounce: [0.68, -0.55, 0.265, 1.55],
        elastic: [0.175, 0.885, 0.32, 1.275],
    },

    // Color presets for gradients
    colorPresets: {
        sunset: 'from-orange-400 via-red-500 to-pink-500',
        ocean: 'from-blue-400 via-blue-500 to-blue-600',
        forest: 'from-green-400 via-green-500 to-emerald-600',
        galaxy: 'from-purple-400 via-purple-500 to-indigo-600',
        fire: 'from-red-400 via-red-500 to-orange-500',
        sky: 'from-cyan-400 via-blue-500 to-blue-600',
    }
};

// Component factory for common patterns
export function createFlipCardFactory(defaultProps: Partial<any>) {
    return (props: any) => {
        const mergedProps = { ...defaultProps, ...props };
        // Return component with merged props
        return mergedProps;
    };
}

// Batch flip controller for multiple cards
export class FlipController {
    private cards: Set<() => void> = new Set();

    register(flipFn: () => void) {
        this.cards.add(flipFn);
        return () => this.cards.delete(flipFn);
    }

    flipAll() {
        this.cards.forEach(flip => flip());
    }

    flipSequence(delay = 200) {
        let index = 0;
        this.cards.forEach(flip => {
            setTimeout(() => flip(), index * delay);
            index++;
        });
    }

    flipRandom() {
        const cardsArray = Array.from(this.cards);
        const randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
        randomCard?.();
    }

    clear() {
        this.cards.clear();
    }
}

// Performance optimization utilities
export const performanceUtils = {
    // Debounce function for rapid triggers
    debounce: (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func: Function, limit: number) => {
        let inThrottle: boolean;
        return function executedFunction(this: any, ...args: any[]) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if reduced motion is preferred
    prefersReducedMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// Animation presets
export const animationPresets = {
    gentle: { duration: 0.8, ease: flipUtils.easings.easeOut },
    snappy: { duration: 0.3, ease: flipUtils.easings.easeInOut },
    bouncy: { duration: 0.6, ease: flipUtils.easings.bounce },
    elastic: { duration: 0.8, ease: flipUtils.easings.elastic },
};