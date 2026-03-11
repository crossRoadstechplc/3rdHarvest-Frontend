import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const publicButtonVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] px-6 py-3 text-sm font-semibold tracking-[0.06em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloomGold/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-bloomGreen text-white hover:bg-bloomGreen/90",
        secondary: "border border-bloomGreen/25 bg-white text-bloomGreen hover:border-bloomGold/60 hover:text-bloomDarkCoffee",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type PublicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof publicButtonVariants>;

export const PublicButton = ({ className, variant, ...props }: PublicButtonProps) => {
  return <button className={cn(publicButtonVariants({ variant }), className)} {...props} />;
};
