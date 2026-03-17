import type { ReactNode } from "react";
import { BloomNav } from "@/components/BloomNav";
import { BrandWordmark } from "@/components/BrandWordmark";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/public/SectionContainer";

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export const LegalPageLayout = ({ title, intro, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <BloomNav />
      <section className="bloom-soft-section py-24 md:py-28">
        <SectionContainer size="wide">
          <article className="bloom-panel p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloomGold">
              <BrandWordmark
                numberClassName="text-[#b3872f]"
                harvestClassName="text-[#496255]"
                superscriptClassName="ml-[0.02em]"
                spacerClassName="ml-[0.2em]"
              />
            </p>
            <h1 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">{intro}</p>
            <div className="mt-8 space-y-6 text-bloomDarkCoffee/80">{children}</div>
          </article>
        </SectionContainer>
      </section>
      <Footer />
    </div>
  );
};
