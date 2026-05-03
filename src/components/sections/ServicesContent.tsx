import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  key: string;
  icon: string;
  title: string;
  desc: string;
  image?: string;
}

interface ServicesContentProps {
  title: string;
  body: string;
  services: ServiceItem[];
  badgeText?: string;
}

import * as LucideIcons from 'lucide-react';

export const ServicesContent: React.FC<ServicesContentProps> = ({ title, body, services: initialServices, badgeText = 'Services' }) => {
  const [liveServices, setLiveServices] = React.useState(initialServices);
  const [liveTitle, setLiveTitle] = React.useState(title);
  const [liveBody, setLiveBody] = React.useState(body);
  const [liveBadgeText, setLiveBadgeText] = React.useState(badgeText);

  React.useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'UPDATE_PREVIEW') {
        const d = e.data.data;
        const l = e.data.lang;
        const f = l === 'es' ? 'valueEs' : 'valueEn';
        
        if (d['services.title']) setLiveTitle(d['services.title'][f]);
        if (d['services.body']) setLiveBody(d['services.body'][f]);
        if (d['services.badge']) setLiveBadgeText(d['services.badge'][f]);

        setLiveServices(prev => prev.map(s => {
          const sTitle = d[`services.${s.key}.title`]?.[f] ?? s.title;
          const sDesc = d[`services.${s.key}.desc`]?.[f] ?? s.desc;
          const sIcon = d[`icon.service.${s.key}`]?.valueEn ?? s.icon; // Icon value is language-agnostic
          const sImage = d[`image.service.${s.key}`]?.valueEn ?? s.image;
          return { ...s, title: sTitle, desc: sDesc, icon: sIcon || s.icon, image: sImage };
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [initialServices]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-160px' }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex flex-col text-center md:flex-row md:items-end md:justify-between md:text-left gap-6"
      >
        <div className="max-w-2xl">
          <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary sm:mb-4 sm:px-4 sm:text-sm" data-edit-key="services.badge">
            {liveBadgeText}
          </div>
          <h2 data-edit-key="services.title" className="font-serif text-3xl font-semibold text-on-surface sm:text-4xl md:text-5xl">
            {liveTitle}
          </h2>
          <p data-edit-key="services.body" className="mt-4 text-base text-on-surface-muted whitespace-pre-line sm:mt-6 sm:text-lg">
            {liveBody}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-150px' }}
        className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {liveServices.map((service, index) => {
          // Dynamic Lucide icon component mapping
          // Support for exact match (e.g. 'Home') or our legacy mappings
          const LegacyMapping: Record<string, string> = {
            home: 'Home',
            building: 'Building2',
            key: 'Key',
            star: 'Star',
            chat: 'MessageCircle',
            handshake: 'Handshake'
          };
          const resolvedName = LegacyMapping[service.icon] || service.icon || 'Home';
          const IconComponent = (LucideIcons as any)[resolvedName] || LucideIcons.Home;

          return (
          <motion.article
            key={service.key}
            variants={item}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-surface shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(227,30,47,0.1)] sm:rounded-3xl ${
              index === 1 ? 'lg:-translate-y-8' : ''
            }`}
          >
            {/* Image Header */}
            {service.image && (
              <div className="relative h-48 sm:h-56 overflow-hidden" data-edit-key={`image.service.${service.key}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm text-primary shadow-lg overflow-hidden" data-edit-key={`icon.service.${service.key}`}>
                  <IconComponent className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </div>
            )}

            {/* Text Content */}
            <div className="relative z-10 p-6 sm:p-8">
              {!service.image && (
                <>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform duration-700 ease-out group-hover:scale-[2.5]" />
                  <div className="relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-light/5 text-secondary transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:scale-110 shadow-sm group-hover:shadow-[0_0_20px_rgba(227,30,47,0.3)] group-hover:-translate-y-2 overflow-hidden" data-edit-key={`icon.service.${service.key}`}>
                    <IconComponent className="h-8 w-8 transition-transform duration-500 group-hover:rotate-6" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </>
              )}
              <h3 data-edit-key={`services.${service.key}.title`} className="font-serif text-2xl font-bold text-on-surface transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>
              <p data-edit-key={`services.${service.key}.desc`} className="mt-3 leading-relaxed text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface/90">
                {service.desc}
              </p>

              <div className="mt-6 flex items-center text-primary font-semibold opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                <span className="text-sm uppercase tracking-wide">Learn more</span>
                <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 ease-in-out group-hover:w-full" />
          </motion.article>
        )})}
      </motion.div>
    </div>
  );
};
