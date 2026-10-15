import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./Icon";

export type BadgeVariant = "default" | "primary" | "outline" | "subtle";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconName;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-100 text-zinc-700 border-zinc-200/80",
  primary: "bg-zinc-900 text-zinc-100 border-zinc-900",
  outline: "bg-white text-zinc-600 border-zinc-200",
  subtle: "bg-zinc-50 text-zinc-600 border-zinc-200/60",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-[11px] px-1.5 py-0.5 rounded gap-1 font-normal",
  md: "text-xs px-2 py-0.5 rounded gap-1.5 font-medium",
};

export function Badge({
  variant = "default",
  size = "sm",
  icon,
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 11 : 13} /> : null}
      {children}
    </span>
  );
}
