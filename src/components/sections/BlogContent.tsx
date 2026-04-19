import React from 'react';
import { motion } from 'framer-motion';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  href: string;
}

interface BlogContentProps {
  title: string;
  emptyText: string;
  viewAllText: string;
  viewAllHref: string;
  posts: Post[];
}

export const BlogContent: React.FC<BlogContentProps> = ({
  title,
  emptyText,
  viewAllText,
  viewAllHref,
  posts,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.16 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="bg-surface-gray py-24 md:py-32" id="blog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              Real Estate Insights
            </div>
            <h2 className="font-serif text-4xl font-semibold text-on-surface md:text-5xl lg:text-5xl">
              {title}
            </h2>
          </div>
          {posts.length > 0 && (
            <a
              href={viewAllHref}
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary-dark hover:text-white hover:border-primary-dark hover:shadow-sm"
            >
              {viewAllText}
            </a>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-surface p-12 text-center shadow-sm">
            <p className="text-on-surface-muted text-lg">{emptyText}</p>
            <a
              href={viewAllHref}
              className="mt-6 inline-flex rounded-md border-2 border-primary px-6 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              {viewAllText}
            </a>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-150px' }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.slice(0, 3).map((p) => (
              <motion.a
                key={p.slug}
                variants={item}
                whileHover={{ y: -6 }}
                href={p.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-surface shadow-md transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-surface-muted flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-serif text-2xl font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 leading-relaxed text-on-surface-muted">
                    {p.excerpt}
                  </p>
                  
                  <div className="mt-8 flex items-center text-accent font-semibold group-hover:underline decoration-accent/50 underline-offset-4">
                    Read Article
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
