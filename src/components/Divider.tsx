// Divider.tsx
import { type JSX } from "solid-js";

type DividerProps = {
    flip?: boolean;   // kalau true → gelombang kebalik
    color?: string;   // warna wave
    class?: string;   // styling tambahan
};

export default function Divider(props: DividerProps): JSX.Element {
    return (
        <div
            class={`overflow-hidden leading-none ${props.class ?? ""} ${
                props.flip ? "rotate-180" : ""
            }`}
        >
            <svg
                class="block w-full h-20 border-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none" // biar nggak rusak pas resize
            >
                <path
                    fill={props.color ?? "#ffffff"}
                    d="M0,64L48,101.3C96,139,192,213,288,234.7C384,256,480,224,576,213.3C672,203,768,213,864,218.7C960,224,1056,224,1152,229.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
}
