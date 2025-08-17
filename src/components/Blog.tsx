import { For } from "solid-js";
import {useQuery} from "@tanstack/solid-query";
import {Icon} from "@iconify-icon/solid";
import Button, {ButtonVariant} from "./Button.tsx";
import {useNavigate} from "@solidjs/router";

export function Blog() {
    const navigate = useNavigate();
    const blog = useQuery(() => ({
        queryKey: ["blog"],
        queryFn: () => fetch("/posts.json").then(r => r.json()).then(r => {
            return r as Array<Record<string, any>>;
        })
    }))
    return <div id={"blog"}>
        <div class="px-12 md:px-32 pb-5 pt-12 text-center translate-y-[-1px] bg-sky-600">
            <h2 class={"text-3xl text-sky-200 font-semibold mb-5"}>Blog</h2>
            <p class={"text-sky-50 mb-5"}>just write something</p>
            <div class={"flex flex-wrap justify-center"}>
                <For each={blog.data}>
                    {p => <div class={"flex flex-col justify-center items-center w-64 border rounded-md bg-white shadow-lg p-2"}>
                        <h3 class={"font-semibold leading-tight text-xl my-3"}>
                            {p.title}
                        </h3>
                        <p class={"leading-relaxed text-base mb-2"}>
                            {p.description}
                        </p>
                        <Button variant={ButtonVariant.Secondary} class={"w-1/2 mb-3"} onClick={(e) => {
                            e.preventDefault();
                            navigate("/posts/"+p.slug)
                        }}>
                            Read More
                        </Button>
                        <div class={"flex flex-wrap justify-center items-center"}>
                            <For each={p.tech}>
                                {tech => <Icon icon={"material-icon-theme:"+ tech} width={20} class={""}/>}
                            </For>
                        </div>
                    </div>}
                </For>
            </div>
        </div>
        {/*<Divider color={"#0084d1"} />*/}
    </div>
}