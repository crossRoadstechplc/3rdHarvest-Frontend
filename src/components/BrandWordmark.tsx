import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  className?: string;
  numberClassName?: string;
  harvestClassName?: string;
  superscriptClassName?: string;
  spacerClassName?: string;
  ariaLabel?: string;
};

export const BrandWordmark = ({
  className,
  numberClassName,
  harvestClassName,
  superscriptClassName,
  spacerClassName,
  ariaLabel = "3rd Harvest",
}: BrandWordmarkProps) => {
  return (
    <span
      className={cn("inline-flex items-baseline normal-case", className)}
      style={{ fontFamily: "\"Times New Roman\", Times, serif" }}
      aria-label={ariaLabel}
    >
      <span className={cn("text-[1.2em] leading-none", numberClassName)}>
        3
        <sup className={cn("align-super text-[0.5em] leading-none normal-case", superscriptClassName)}>rd</sup>
      </span>
      <span className={cn("ml-1", harvestClassName, spacerClassName)}>Harvest</span>
    </span>
  );
};
