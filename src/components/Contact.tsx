import Divider from "./Divider.tsx";
import Button, {ButtonVariant} from "./Button.tsx";
import {Icon} from "@iconify-icon/solid";

export function Contact() {
    return <div id={"contact"} class={"w-full bg-gray-200"}>
        <Divider color={"#0084d1"} flip={true} class={"translate-y-[-2px]"} />
        <div class={"w-full px-12 md:px-32 py-5 mx-auto"}>

            <div class={"flex w-full gap-2 flex-wrap"}>
                <div class={"flex-1"}>
                    <p class={""}>I'M HERE TO HELP YOU</p>
                    <h2 class={"text-6xl"}><span class={"font-bold"}>Discuss</span> Your IT Solution Needs</h2>
                    <p class={"text-muted-foreground"}>Are you looking for suitable & flawless IT services? Reach out to me</p>
                    <div class={"flex justify-start items-center gap-4 my-5"}>
                        <Icon icon={"material-symbols:mail"} class={"text-sky-600"} width={50}/>
                        <div class={""}>
                            <p class={"text-muted-foreground"}>Email</p>
                            <a href={"mailto:admin@reyzeal.com"}>admin@reyzeal.com</a>
                        </div>
                    </div>
                </div>
                <form class={"flex-1 w-full flex flex-col gap-4 border-0 bg-white px-10 py-12 rounded-lg shadow-md"}>
                    <div>
                        <label class={"text-gray-600 mb-4"}>Name</label>
                        <input class={"border-0 bg-gray-200 p-2 rounded-md w-full"}/>
                    </div>
                    <div>
                        <label class={"text-gray-600"}>Email</label>
                        <input class={"border-0 bg-gray-200 p-2 rounded-md w-full"}/>
                    </div>
                    <div>
                        <label class={"text-gray-600"}>Message</label>
                        <textarea class={"border-0 bg-gray-200 p-2 rounded-md w-full"}/>
                    </div>

                    <Button variant={ButtonVariant.Primary}>
                        Send
                        <Icon icon={"tabler:send"} class={"px-2"} width={20}/>
                    </Button>
                </form>

            </div>
        </div>

        <Divider color={"#0084d1"} class={"translate-y-[1px]"} />
    </div>
}