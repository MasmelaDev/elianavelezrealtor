import React from 'react';
import { motion } from 'framer-motion';

interface WhyItem {
  key: 'item1' | 'item2' | 'item3';
  icon: 'map' | 'handshake' | 'shield';
  title: string;
  desc: string;
}

interface WhyChooseContentProps {
  title: string;
  subtitle: string;
  items: WhyItem[];
}

export const WhyChooseContent: React.FC<WhyChooseContentProps> = ({
  title,
  subtitle,
  items,
}) => {
  const container = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.16,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        className="mx-auto max-w-2xl text-center flex flex-col items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.img
          src="/images/realstate.png"
          alt=""
          className="mb-6 h-16 w-auto opacity-90 drop-shadow-sm sm:h-20"
          aria-hidden="true"
          variants={item}
        />
        <motion.h2
          className="font-serif text-3xl font-semibold text-on-surface sm:text-4xl md:text-4xl"
          data-edit-key="why.title"
          variants={item}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mt-4 text-base leading-relaxed text-on-surface-muted sm:text-lg"
          data-edit-key="why.subtitle"
          variants={item}
        >
          {subtitle}
        </motion.p>
      </motion.header>

      {/* Items */}
      <motion.ul
        className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-12"
        role="list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {items.map(({ key, icon, title: itemTitle, desc }) => (
          <motion.li
            key={key}
            variants={item}
            className="relative rounded-2xl border border-primary/10 bg-surface p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-accent/30 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
              <span
                className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-0"
                aria-hidden="true"
              >
                {icon === 'map' && (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                )}
                {icon === 'handshake' && (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                )}
                {icon === 'shield' && (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                )}
              </span>
              <div>
                <h3
                  className="font-serif text-xl font-semibold text-on-surface sm:text-2xl"
                  data-edit-key={`why.${key}.title`}
                >
                  {itemTitle}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-on-surface-muted sm:text-base"
                  data-edit-key={`why.${key}.desc`}
                >
                  {desc}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

