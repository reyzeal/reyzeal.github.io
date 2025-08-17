import Divider from "./Divider.tsx";
import Button, {ButtonVariant} from "./Button.tsx";

export function Contact() {
    return <div id={"contact"} class={"w-full"}>
        <Divider color={"#0084d1"} flip={true} class={"translate-y-[-2px]"} />
        <div class={"text-center w-full px-12 md:px-32 max-w-lg py-5 mx-auto"}>
            <h2 class={"text-3xl font-semibold mb-5"}>Contact</h2>
            <form class={"w-full flex flex-col gap-4"}>
                <input class={"border p-2 rounded-md w-full"} placeholder={"Name"}/>
                <input class={"border p-2 rounded-md w-full"} placeholder={"Email"}/>
                <textarea class={"border p-2 rounded-md w-full"} placeholder={"Message"}/>
                <Button variant={ButtonVariant.Primary}>Send</Button>
            </form>
        </div>

        <Divider color={"#0084d1"} class={"translate-y-[1px]"} />
    </div>
}