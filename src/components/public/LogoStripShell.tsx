import type { PropsWithChildren } from "react";
import { SectionContainer } from "@/components/public/SectionContainer";
import { cn } from "@/lib/utils";

type LogoStripShellProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export const LogoStripShell = ({ title, className, children }: LogoStripShellProps) => {
  return (
    <section className={cn("py-14", className)} aria-label="Partner logos">
      <SectionContainer>
        <div
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] sm:p-6 md:p-8"
          data-testid="logo-strip-shell"
        >
          {title ? <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-bloomGreen/70">{title}</p> : null}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:gap-x-10 md:gap-y-6"
            data-testid="logo-strip-row"
          >
            {children}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};
