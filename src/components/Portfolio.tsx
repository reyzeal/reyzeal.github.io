import { For } from "solid-js";
import Divider from "./Divider.tsx";
import portfolio from "../assets/portfolio.json";
import {Icon} from "@iconify-icon/solid";
import Button, {ButtonVariant} from "./Button.tsx";
import {useNavigate} from "@solidjs/router";
// import {useQuery} from "@tanstack/solid-query";

export function Portfolio() {
    const navigate = useNavigate();
    // const portfolio = useQuery(() => ({
    //     queryKey: ["portfolio"],
    //     queryFn: () => fetch("./assets/portfolio.json?url").then(r => r.json()).then(r => {
    //         return (r as Array<Record<string, any>>).slice(0,4);
    //     })
    // }))
    return <div id={"portfolio"}>
        <div class="px-12 md:px-32 pb-5 pt-12 text-center translate-y-[-1px]">
            <h2 class={"text-3xl font-semibold mb-5"}>Portfolio</h2>
            <div class={"flex flex-wrap justify-center gap-4"}>
                <For each={portfolio}>
                    {p => <div class={"flex flex-col justify-start items-center w-64 border rounded-md bg-white shadow-lg p-2"}>
                        <h3 class={"font-semibold leading-tight text-xl my-3"}>
                            {p.title}
                        </h3>
                        <p class={"leading-relaxed text-base mb-2 flex-1 flex items-center text-center"}>
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
        <Divider color={"#0084d1"} />
    </div>
}