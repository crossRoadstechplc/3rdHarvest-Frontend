import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/lib/api/publicCms";
import { SectionContainer } from "@/components/public/SectionContainer";

type PreviewPost = {
  id?: string | number;
  slug?: string;
  title?: string;
  excerpt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
};

function normalizePosts(value: unknown): PreviewPost[] {
  if (Array.isArray(value)) {
    return value as PreviewPost[];
  }

  if (value && typeof value === "object" && Array.isArray((value as { posts?: unknown[] }).posts)) {
    return ((value as { posts?: unknown[] }).posts as PreviewPost[]) || [];
  }

  return [];
}

export const InsightsPreviewSection = () => {
  const [posts, setPosts] = useState<PreviewPost[]>([]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await getPosts({ category: "insights", page: 1, limit: 4 });
        let normalized = normalizePosts(response);

        if (normalized.length === 0) {
          const fallbackResponse = await getPosts({ page: 1, limit: 4 });
          normalized = normalizePosts(fallbackResponse);
        }

        if (isMounted) {
          setPosts(normalized);
        }
      } catch {
        if (isMounted) {
          setPosts([]);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const visiblePosts = useMemo(() => posts.filter((post) => post.slug && post.title).slice(0, 4), [posts]);

  return (
    <section className="bloom-soft-section py-24 md:py-28">
      <SectionContainer size="wide" className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bloom-panel p-6 md:p-8"
        >
          <p className="text-xl font-semibold uppercase tracking-[0.16em] text-bloomGold">INSIGHTS</p>
          <h2 className="mt-3 text-4xl leading-tight text-bloomDarkCoffee md:text-5xl">Publications and Updates</h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-bloomDarkCoffee/80 md:text-lg">
            <p>
              3rd Harvest publishes insights on coffee systems, circular agriculture, renewable energy, and community resilience.
            </p>
            <p>Recent updates may include:</p>
            <ul className="space-y-2">
              <li>• field reports</li>
              <li>• concept notes</li>
              <li>• program updates</li>
              <li>• research insights</li>
            </ul>
          </div>
        </motion.div>

        {visiblePosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            data-testid="insights-preview-grid"
          >
            {visiblePosts.map((post) => (
              <article
                key={String(post.id ?? post.slug)}
                className="bloom-panel overflow-hidden transition-shadow duration-300 hover:shadow-[0_16px_30px_rgba(30,30,30,0.09)]"
              >
                {post.featured_image_url ? (
                  <img
                    src={post.featured_image_url}
                    alt={post.featured_image_alt || post.title || "Insight image"}
                    className="block aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-bloomBeige/60 text-xs font-semibold uppercase tracking-[0.16em] text-bloomDarkCoffee/40">
                    Insight
                  </div>
                )}
                <div className="space-y-3 p-4">
                  <h3 className="font-serif text-xl leading-tight text-bloomDarkCoffee">{post.title}</h3>
                  {post.excerpt ? <p className="text-sm leading-relaxed text-bloomDarkCoffee/75">{post.excerpt}</p> : null}
                  <Link to={`/insights/${post.slug}`} className="inline-flex text-sm font-semibold uppercase tracking-[0.08em] text-bloomGreen hover:text-bloomGold">
                    Read insight
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        ) : null}

        <div>
          <Link
            to="/insights"
            className="inline-flex rounded-[10px] border border-bloomGreen/25 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-bloomGreen hover:border-bloomGold/60 hover:text-bloomDarkCoffee"
          >
            INSIGHTS
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
};
