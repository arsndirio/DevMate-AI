/**
 * src/components/ui/Button.tsx
 * Komponen tombol UI generik yang reusable dan accessible untuk DevMate AI.
 */

import React from "react";
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
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs border border-blue-600/20 disabled:bg-blue-300 disabled:cursor-not-allowed",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 border border-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "bg-white text-zinc-800 hover:bg-zinc-50 active:bg-zinc-100 border border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed",
  subtle:
    "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 border border-blue-200/60 disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-3.5 py-2 rounded-lg gap-2",
  lg: "text-base px-4 py-2.5 rounded-lg gap-2.5",
  icon: "p-2 rounded-lg justify-center",
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
    "inline-flex items-center font-medium transition-colors duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2";

  const iconElement = icon && !isLoading ? (
    <Icon
      name={icon}
      size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
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
        <span className="inline-block animate-spin mr-1.5 h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full" />
      ) : null}

      {iconPosition === "left" ? iconElement : null}
      {children}
      {iconPosition === "right" ? iconElement : null}
    </button>
  );
}
