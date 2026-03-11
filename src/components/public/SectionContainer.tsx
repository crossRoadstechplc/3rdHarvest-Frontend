import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = PropsWithChildren<{
  className?: string;
  size?: "default" | "wide";
}>;

export const SectionContainer = ({ children, className, size = "default" }: SectionContainerProps) => {
  const sizeClass = size === "wide" ? "max-w-[1720px]" : "max-w-[1200px]";
  return <div className={cn("mx-auto w-full px-6 md:px-10", sizeClass, className)}>{children}</div>;
};
