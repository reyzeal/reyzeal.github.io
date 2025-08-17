import {createSignal} from "solid-js";

export default function Navbar() {
    const [isOpen, setIsOpen] = createSignal(false);
    // onMount(() => {
    //     const handleScroll = (e) => {
    //         console.log(e.target)
    //         // setIsOpen(false);
    //     }
    //     window.addEventListener("scroll", handleScroll);
    //     onCleanup(() => window.removeEventListener("scroll", handleScroll))
    // })
    return (
        <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="/" class="text-xl font-bold text-sky-600">
                        Reyzeal
                    </a>

                    {/* Desktop Menu */}
                    <nav class="hidden md:flex gap-8 text-gray-700 font-medium">
                        <a href="/#about" class="hover:text-sky-600 transition">About</a>
                        <a href="/#portfolio" class="hover:text-sky-600 transition">Portfolio</a>
                        <a href="/#blog" class="hover:text-sky-600 transition">Blog</a>
                        <a href="/#contact" class="hover:text-sky-600 transition">Contact</a>
                    </nav>

                    {/* Mobile Button */}
                    <button
                        class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsOpen(!isOpen())}
                    >
                        <svg
                            class="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen() ? (
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav
                data-open={isOpen()}
                class="md:hidden overflow-hidden transition-all duration-300 ease-in-out">
                <div class={"px-4 py-4 flex flex-col gap-3 text-gray-700 font-medium bg-white border-t border-gray-200"}>
                    <a href="/#about" onClick={() => setIsOpen(false)} class="hover:text-sky-600 transition">About</a>
                    <a href="/#portfolio" onClick={() => setIsOpen(false)} class="hover:text-sky-600 transition">Portfolio</a>
                    <a href="/#blog" onClick={() => setIsOpen(false)} class="hover:text-sky-600 transition">Blog</a>
                    <a href="/#contact" onClick={() => setIsOpen(false)} class="hover:text-sky-600 transition">Contact</a>
                </div>
            </nav>
        </header>
    );
}
