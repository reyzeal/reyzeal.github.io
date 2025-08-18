import Navbar from "../components/Navbar.tsx";
import {Footer} from "../components/Footer.tsx";
import {createEffect, createSignal, onCleanup, onMount} from "solid-js";
import {useNavigate} from "@solidjs/router";

export default function (){
    const navigate = useNavigate();
    const [counter, setCounter] = createSignal(10);
    const [tracker, setTracker] = createSignal<NodeJS.Timeout>()
    createEffect(() => {
        if(!counter()){
            navigate("/");
        }
    })
    onMount(() => {
        const handler = () => {
            setCounter(x => {
                let y = x - 1;
                if(y === 0) {
                    clearInterval(tracker())
                    setTracker(undefined)
                }
                return y;
            });
        }
        setTracker(setInterval(handler, 1000))

        onCleanup(() => {
            if(tracker()){
                clearInterval(tracker())
            }

        })
    })
    return <>
        <Navbar/>
        <div class={"flex relative flex-col justify-center items-center w-full min-h-screen" +
            ""}>
            <div class={"absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 to-white"}></div>
            <h1 class={"text-4xl font-semibold"}>404 - Not Found</h1>
            <p>The page you requested does not exist.</p>
            <p>Redirecting to homepage ... ({counter()}s)</p>
        </div>
        <Footer/>
    </>
}