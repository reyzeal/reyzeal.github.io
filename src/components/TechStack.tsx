import {For} from "solid-js";
import {Icon} from "@iconify-icon/solid";
import {createIntersectionObserver} from "../utils/createIntersectionObserver.ts";
import {Motion} from "solid-motionone";

export function TechStack(){
    const { register, isVisible } = createIntersectionObserver({ threshold: 0.5, rootMargin: "10px" });

    let refs: HTMLAnchorElement[] = [];

    const techs = [
        {
            title: "Rust",
            description: "Programming Language",
            icon: <Icon icon={"material-icon-theme:rust"} width={32} />,
            link: "https://www.rust-lang.org/",
        },
        {
            title: "Golang",
            description: "Programming Language",
            icon: <Icon icon={"skill-icons:golang"} width={32} />,
            link: "https://go.dev/",
        },
        {
            title: "Typescript",
            description: "Programming Language",
            icon: <Icon icon={"material-icon-theme:typescript"} width={32} />,
            link: "https://www.typescriptlang.org/",
        },
        {
            title: "JavaScript",
            description: "Programming Language",
            icon: <Icon icon={"skill-icons:javascript"} width={32} />,
            link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
            title: "Python",
            description: "Programming Language",
            icon: <Icon icon={"skill-icons:python-dark"} width={32} />,
            link: "https://www.python.org/",
        },
        {
            title: "GCP",
            description: "Cloud Platform",
            icon: <Icon icon={"skill-icons:gcp-light"} width={32} />,
            link: "https://cloud.google.com/",
        },
        {
            title: "AWS",
            description: "Cloud Platform",
            icon: <Icon icon={"skill-icons:aws-dark"} width={32} />,
            link: "https://aws.amazon.com/",
        },
        {
            title: "Docker",
            description: "Container Platform",
            icon: <Icon icon={"skill-icons:docker"} width={32} />,
            link: "https://www.docker.com/",
        },
        {
            title: "Vite",
            description: "Build Tool",
            icon: <Icon icon={"skill-icons:vite-dark"} width={32} />,
            link: "https://vitejs.dev/",
        },
        {
            title: "Redis",
            description: "Database",
            icon: <Icon icon={"skill-icons:redis-light"} width={32} />,
            link: "https://redis.io/",
        },
        {
            title: "MongoDB",
            description: "Database",
            icon: <Icon icon={"skill-icons:mongodb"} width={32} />,
            link: "https://www.mongodb.com/",
        },
        {
            title: "Postman",
            description: "API Testing",
            icon: <Icon icon={"skill-icons:postman"} width={32} />,
            link: "https://www.postman.com/",
        },
        {
            title: "Node.js",
            description: "Runtime",
            icon: <Icon icon={"skill-icons:nodejs-light"} width={32} />,
            link: "https://nodejs.org/",
        },
        {
            title: "Bun",
            description: "Runtime",
            icon: <Icon icon={"skill-icons:bun-light"} width={32} />,
            link: "https://bun.sh/",
        },
        {
            title: "Linux",
            description: "Operating System",
            icon: <Icon icon={"skill-icons:linux-light"} width={32} />,
            link: "https://www.linux.org/",
        },
        {
            title: "Actix",
            description: "Web Framework",
            icon: <Icon icon={"skill-icons:actix-light"} width={32} />,
            link: "https://actix.rs/",
        },
        {
            title: "ExpressJS",
            description: "Web Framework",
            icon: <Icon icon={"skill-icons:expressjs-light"} width={32} />,
            link: "https://expressjs.com/",
        },
        {
            title: "React",
            description: "Frontend Framework",
            icon: <Icon icon={"skill-icons:react-dark"} width={32} />,
            link: "https://react.dev/",
        },
        {
            title: "Solid",
            description: "Frontend Framework",
            icon: <Icon icon={"skill-icons:solidjs-light"} width={32} />,
            link: "https://www.solidjs.com/",
        },
        {
            title: "Tailwind",
            description: "CSS Framework",
            icon: <Icon icon={"skill-icons:tailwindcss-light"} width={32} />,
            link: "https://tailwindcss.com/",
        },
        {
            title: "GitHub",
            description: "Repo & Workflow",
            icon: <Icon icon={"skill-icons:github-dark"} width={32} />,
            link: "https://github.com/",
        },{
            title: "Firebase",
            description: "BaaS Platform",
            icon: <Icon icon={"logos:firebase-icon"} width={32} />,
            link: "https://firebase.google.com/",
        },{
            title: "RabbitMQ",
            description: "Message Broker",
            icon: <Icon icon={"devicon:rabbitmq"} width={32} />,
            link: "https://www.rabbitmq.com/",
        },
        {
            title: "Cloudflare",
            description: "CDN & Security",
            icon: <Icon icon={"devicon:cloudflare"} width={32} />,
            link: "https://www.cloudflare.com/",
        },
        {
            title: "OpenCV",
            description: "Computer Vision",
            icon: <Icon icon={"skill-icons:opencv-light"} width={32} />,
            link: "https://opencv.org",
        },
    ];
    // createEffect(() => {
    //     console.log(refs)
    // })
    return <div class={"w-full flex flex-col gap-4"}>
        <h3 class={"text-3xl text-center font-semibold"}>My Tech Stack</h3>
        <p class={"text-center my-2 px-2"}>My daily toolkit featuring code, deployment, runtime and tools.</p>
        <div class={"text-center w-full flex flex-wrap justify-center items-center gap-4"}>
            <For each={techs}>
                {(x, index) => <Motion.a ref={(el) => {
                    refs.push(el);
                    register(el);
                }} href={x.link} class={"border py-3 border-gray-400 rounded-md shadow-md w-64" +
                    " flex"} target={"_blank"} rel={"noreferrer"}
                 initial={{opacity:0}}
                 animate={isVisible(refs[index()])?{opacity:1}:{opacity:0}}
                 transition={{duration:2}}
                                         hover={{scale:1.05, background: "#a0d5f4"}}
                >
                        <div class="flex justify-center items-center p-2">{x.icon}</div>
                        <div class="flex-grow text-left">
                            <h4 class={"font-semibold"}>{x.title}</h4>
                            <p class={"text-sm text-muted-foreground"}>{x.description}</p>
                        </div>
                        <div class={"flex justify-center items-center p-2"}>
                            <Icon icon={"ep:arrow-right-bold"} width={24} class={"color-[#b9cee3]"} />
                        </div>
                </Motion.a> }
            </For>
        </div>
    </div>
}