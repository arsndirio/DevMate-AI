/**
 * src/components/ui/Badge.tsx
 * Komponen label status / badge untuk penanda konteks, status model, dan bahasa pemrograman.
 */

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./Icon";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "info" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconName;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-100 text-zinc-700 border-zinc-200",
  primary: "bg-blue-50 text-blue-700 border-blue-200/80",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  info: "bg-sky-50 text-sky-700 border-sky-200/80",
  outline: "bg-white text-zinc-600 border-zinc-300",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium",
  md: "text-xs px-2.5 py-1 rounded-md gap-1.5 font-medium",
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
        "inline-flex items-center border select-none transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 12 : 14} /> : null}
      {children}
    </span>
  );
}
