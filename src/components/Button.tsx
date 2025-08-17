import { type JSX } from "solid-js";

// optional kalau mau lebih advance

// @ts-ignore
export enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
    Outline = "outline",
    Ghost = "ghost",
}

// @ts-ignore
export enum ButtonSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg",
}

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
    [ButtonVariant.Primary]:
        "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500",
    [ButtonVariant.Secondary]:
        "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    [ButtonVariant.Outline]:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    [ButtonVariant.Ghost]:
        "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
};

const sizeClasses: Record<ButtonSize, string> = {
    [ButtonSize.Sm]: "px-3 py-1.5 text-sm",
    [ButtonSize.Md]: "px-4 py-2 text-base",
    [ButtonSize.Lg]: "px-6 py-3 text-lg",
};

export default function Button(props: ButtonProps) {
    const {
        variant = ButtonVariant.Primary,
        size = ButtonSize.Md,
        class: className,
        ...rest
    } = props;

    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${
        className || ""
    }`;

    return <button class={classes} {...rest} />;
}
