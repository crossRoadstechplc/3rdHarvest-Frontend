type BakedTextImageCardProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description?: string;
  eyebrow?: string;
  ratio?: "2:3" | "16:9" | "square";
  className?: string;
};

export const BakedTextImageCard = ({
  imageUrl,
  imageAlt,
  title,
  description,
  eyebrow,
  ratio = "2:3",
  className = "",
}: BakedTextImageCardProps) => {
  const ratioClass =
    ratio === "16:9"
      ? "aspect-[16/9]"
      : ratio === "square"
        ? "aspect-square"
        : "aspect-[2/3]";

  return (
    <article
      className={`group relative ${ratioClass} overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(30,30,30,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(30,30,30,0.1)] ${className}`}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/46 to-black/10"
        data-testid="baked-text-overlay"
      />

      <div
        className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6 md:p-7"
        data-testid="baked-text-content"
      >
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white!">{eyebrow}</p> : null}
        <h3 className="font-serif text-xl leading-tight sm:text-2xl md:text-[1.75rem] text-white!">{title}</h3>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/92 md:mt-3 md:text-base">{description}</p> : null}
      </div>
    </article>
  );
};
