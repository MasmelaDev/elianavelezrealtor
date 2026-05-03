import React from 'react';

interface AboutContentProps {
  title: string;
  body: string;
  cardImage: string;
  badgeText?: string;
  ctaText?: string;
  happyClientsText?: string;
  badgeFloatingTitle?: string;
  badgeFloatingDesc?: string;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  title,
  body,
  cardImage,
  badgeText = 'About Me',
  ctaText = 'Get in Touch',
  happyClientsText = 'Happy Clients',
  badgeFloatingTitle = 'Certified',
  badgeFloatingDesc = 'Top Realtor',
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* Image Side - first on mobile */}
        <div className="reveal-fade-left relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0">
          {/* Decorative Backdrops */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] transform rotate-3 scale-105 pointer-events-none" />
          <div className="absolute -inset-4 bg-surface-gray/50 rounded-[2.5rem] transform -rotate-2 scale-105 pointer-events-none" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/40 bg-surface shadow-2xl group z-10" data-edit-key="image.about">
            <img
              src={cardImage}
              alt="Realtor portrait"
              className="about-card-img h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                const placeholder = document.getElementById('about-placeholder');
                if (placeholder) placeholder.classList.remove('hidden');
              }}
            />
            <div
              id="about-placeholder"
              className="about-card-placeholder absolute inset-0 hidden flex-col items-center justify-center bg-gray-100 font-serif text-5xl font-medium text-gray-400"
              aria-hidden="true"
            >
              ER
            </div>
          </div>
          
          {/* Decorative Badge */}
          <div className="reveal-scale reveal-delay-3 absolute -right-6 -bottom-6 lg:-right-10 lg:bottom-10 glass rounded-2xl p-4 flex items-center gap-4 shadow-2xl z-20 animate-float">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg text-on-surface" data-edit-key="about.badgeFloatingTitle">{badgeFloatingTitle}</p>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider" data-edit-key="about.badgeFloatingDesc">{badgeFloatingDesc}</p>
            </div>
          </div>
        </div>

        {/* Text Side */}
        <div className="reveal-fade-right lg:pl-8">
          <div className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-accent border border-accent/20 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm" data-edit-key="about.badge">
            {badgeText}
          </div>
          <h2 data-edit-key="about.title" className="font-serif text-3xl font-semibold leading-tight text-on-surface sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            <div className="h-1.5 w-4 bg-primary/40 rounded-full" />
            <div className="h-1.5 w-1.5 bg-primary/20 rounded-full" />
          </div>
          <p data-edit-key="about.body" className="mt-6 text-base leading-relaxed text-on-surface-muted whitespace-pre-line font-light sm:mt-8 sm:text-lg md:text-xl">
            {body}
          </p>
          
          <div className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center">
            <a href="#contact" data-edit-key="about.cta" className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-on-surface px-6 py-3.5 text-center font-bold text-white shadow-lg transition-all hover:bg-primary hover:shadow-primary/30 sm:w-auto sm:px-8 sm:py-4">
              {ctaText}
            </a>
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-surface-gray text-xs font-bold">S</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-surface-gray text-xs font-bold">M</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white">50+</div>
              </div>
              <span data-edit-key="about.happyClients" className="text-sm font-semibold text-on-surface-muted">{happyClientsText}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
