import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface WhyItem {
  key: 'item1' | 'item2' | 'item3';
  icon: string;
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

  const [liveIcons, setLiveIcons] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'UPDATE_PREVIEW') {
        const d = e.data.data;
        if (!d) return;
        const newIcons: Record<string, string> = {};
        if (d['why.item1.icon']) newIcons['why.item1.icon'] = d['why.item1.icon'].valueEn;
        if (d['why.item2.icon']) newIcons['why.item2.icon'] = d['why.item2.icon'].valueEn;
        if (d['why.item3.icon']) newIcons['why.item3.icon'] = d['why.item3.icon'].valueEn;
        setLiveIcons((prev) => ({ ...prev, ...newIcons }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return <LucideIcons.ShieldCheck className="h-6 w-6" />;
    return <IconComponent className="h-6 w-6" />;
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
                data-edit-key={`why.${key}.icon`}
              >
                {renderIcon(liveIcons[`why.${key}.icon`] || icon)}
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

