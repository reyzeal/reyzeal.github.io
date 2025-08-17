import { type Accessor, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

type Options = IntersectionObserverInit;

/**
 * createIntersectionObserver
 * - Return function register() untuk dipakai di ref/`use:` directive
 * - Signals per element via Map
 */
export function createIntersectionObserver(options?: Options) {
    const [entries, setEntries] = createStore<Map<Element, IntersectionObserverEntry>>(
        new Map()
    );

    let observer: IntersectionObserver | null = null;
    const registeredElements = new Set<Element>();

    onMount(() => {
        observer = new IntersectionObserver((obsEntries) => {
            setEntries((prev) => {
                const next = new Map(prev);
                obsEntries.forEach((entry) => {
                    next.set(entry.target, entry);
                });
                return next;
            });
        }, options);

        // Re-observe elements yang sudah terdaftar sebelum observer dibuat
        registeredElements.forEach(el => {
            observer?.observe(el);
        });
    });

    onCleanup(() => {
        observer?.disconnect();
        observer = null;
        registeredElements.clear();
        setEntries(new Map());
    });

    function register(el: Element) {
        // Tambahkan ke set untuk tracking
        registeredElements.add(el);

        // Observe jika observer sudah ada
        if (observer) {
            observer.observe(el);
        }

        onCleanup(() => {
            observer?.unobserve(el);
            registeredElements.delete(el);
            setEntries((prev) => {
                const next = new Map(prev);
                next.delete(el);
                return next;
            });
        });
    }

    return {
        register,
        entries,
        /**
         * Helper: get apakah element terlihat
         */
        isVisible(el: Element): Accessor<boolean> {
            return () => !!entries.get(el)?.isIntersecting;
        },
        /**
         * Helper: get intersection ratio
         */
        getIntersectionRatio(el: Element): Accessor<number> {
            return () => entries.get(el)?.intersectionRatio ?? 0;
        },
        /**
         * Helper: get entry lengkap untuk element
         */
        getEntry(el: Element): Accessor<IntersectionObserverEntry | undefined> {
            return () => entries.get(el);
        }
    };
}