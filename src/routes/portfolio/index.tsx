import Navbar from "../../components/Navbar.tsx";
import {Footer} from "../../components/Footer.tsx";
import {useQuery} from "@tanstack/solid-query";
import portfolio from "../../assets/portfolio.json";
import {createSignal, For} from "solid-js";
import moment from "moment";
import {Icon} from "@iconify-icon/solid";
import {TechsRecord} from "../../utils/techRecords.ts";
import {Motion} from "solid-motionone";
import {useNavigate} from "@solidjs/router";

export default function (){
    const [page, setPage] = createSignal(0);
    const query = useQuery(() => {
        return {
            queryKey: ["portfolio", page()],
            queryFn: () => {
                return (portfolio as Array<Record<string, any>>).slice(page()*10, (page()+1)*10)
            }
        }
    })
    const navigate = useNavigate();
    return <>
        <Navbar/>
        <div class={"w-full mx-auto px-12 md:px-32 h-24 md:h-48 flex items-center justify-start gap-2 bg-gray-200"}>
            <h2 class={"font-semibold text-xl md:text-5xl"}>It's cool to see you here</h2>
            <p></p>
        </div>
        <div class={"px-12 md:px-32 pt-6"}>
            <a href={"/"}>Home</a> {"/"} <a class={"font-semibold"} href={"/portfolio"}>Portfolio</a>
        </div>
        <div class={"w-full md:max-w-2/3"}>
            <For each={query.data}>
                {(p, index) => <Motion.article
                    hover={{scale:1.05}}
                    class={"px-12 md:px-32 overflow-auto relative cursor-pointer max-h-[200px] mt-6 bg-sky-100"} onClick={() => navigate("/portfolio/"+p.slug)}>
                    <div class={`flex relative h-[200px] ${index()%2 == 1?"flex-row-reverse":""}`}>

                        <div class={"flex-1 relative flex justify-center items-center overflow-hidden"}>
                            <div style={{"writing-mode": "vertical-rl"}} class={`font-semibold text-xs ${index()%2==1?"right-0":"left-0"} absolute top-0 origin-center h-[200px] py-2 text-center bg-gray-300/50 z-10`}>
                                {moment(p.date).format("DD-MM-YYYY")}
                            </div>
                            <img src={"https://picsum.photos/200"} class={`absolute ${index()%2==1?"right-0":"left-0"} h-full aspect-square`}/>
                        </div>

                        <div class={`flex-1 py-6 ${index()%2==1?"pr-6":"pl-6"}`}>
                            <h3 class={"text-lg md:text-xl font-semibold line-clamp-2"}>{p.title}</h3>
                            <p class={"text-muted-foreground line-clamp-3 py-2"}>{p.description}</p>
                            <div class={"flex flex-wrap gap-1 overflow-hidden h-[20px]"}>
                                <For each={p.tech}>
                                    {x => <Icon icon={TechsRecord[x].icon} width={20} height={20} />}
                                </For>
                            </div>
                        </div>
                    </div>

                </Motion.article>}
            </For>
        </div>
        <div class={"w-full max-w-1/3"}>

        </div>
        <Footer/>
    </>
}