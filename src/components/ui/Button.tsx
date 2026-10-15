import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "subtle";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: IconName;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 border border-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 active:bg-zinc-200 border border-zinc-200/80 disabled:opacity-40 disabled:cursor-not-allowed",
  outline:
    "bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 border border-zinc-300/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs",
  ghost:
    "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200/70 disabled:opacity-40 disabled:cursor-not-allowed",
  subtle:
    "bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/70 active:bg-zinc-200 border border-zinc-200/60 disabled:opacity-40 disabled:cursor-not-allowed",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-2.5 py-1 rounded-md gap-1.5 font-medium",
  md: "text-xs px-3 py-1.5 rounded-md gap-1.5 font-medium",
  lg: "text-sm px-4 py-2 rounded-md gap-2 font-medium",
  icon: "p-1.5 rounded-md justify-center",
};

export function Button({
  variant = "secondary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center transition-colors duration-100 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-zinc-800 focus-visible:outline-offset-1";

  const iconElement = icon && !isLoading ? (
    <Icon
      name={icon}
      size={size === "sm" ? 13 : size === "lg" ? 16 : 14}
      className={children ? (iconPosition === "left" ? "-ml-0.5" : "-mr-0.5") : ""}
    />
  ) : null;

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-1 h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
      ) : null}

      {iconPosition === "left" ? iconElement : null}
      {children}
      {iconPosition === "right" ? iconElement : null}
    </button>
  );
}
