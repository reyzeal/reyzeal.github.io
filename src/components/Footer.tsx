import { Icon } from '@iconify-icon/solid';
export function Footer() {
    return <>
        <footer class={`bg-sky-600 text-white text-center py-5`}>
            <div class={"flex gap-4 w-full items-center justify-center pb-3"}>
                <a href="https://linkedin.com/in/reyzeal" target={"_blank"}>
                    <Icon icon={"mdi:linkedin"} class={"rounded-full p-1 border-white border"}/>
                </a>
                <a href="https://github.com/reyzeal" target={"_blank"}>
                    <Icon icon={"mdi:github"} class={"rounded-full p-1 border-white border"}/>
                </a>
                <a href="https://twitter.com/reyzeal" target={"_blank"}>
                    <Icon icon={"mdi:twitter"} class={"rounded-full p-1 border-white border"}/>
                </a>
                <a href="https://instagram.com/reyzeal" target={"_blank"}>
                    <Icon icon={"mdi:instagram"} class={"rounded-full p-1 border-white border"}/>
                </a>
            </div>
            <p>Create with ☕ by Rizal Ardhi Rahmadani</p>
        </footer>
    </>
}