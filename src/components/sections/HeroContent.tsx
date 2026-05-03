import React from 'react';

interface HeroContentProps {
  tagline: string;
  title: string;
  subtitle: string;
  role: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  tagline,
  title,
  subtitle,
  role,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
}) => {
  return (
    <div className="relative z-10 flex w-full flex-col justify-center py-28 sm:py-32 lg:py-0">
      <div className="flex w-full max-w-2xl flex-col">
        {/* Tagline Badge */}
        <p
          data-edit-key="hero.tagline"
          className="reveal-on-scroll mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-2 pl-3 pr-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:text-sm"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </span>
          {tagline}
        </p>

        {/* Name & Title */}
        <div className="reveal-on-scroll reveal-delay-1">
          <h1 data-edit-key="hero.title" className="font-serif text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem]">
            {title}
          </h1>
          <div className="mt-3 flex items-center gap-3 sm:mt-4">
            <div className="h-[2px] w-10 bg-accent sm:w-14" />
            <span data-edit-key="hero.role" className="text-sm font-bold uppercase tracking-[0.3em] text-accent sm:text-base md:text-lg">
              {role}
            </span>
            <div className="h-[2px] w-10 bg-accent sm:w-14" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          data-edit-key="hero.subtitle"
          className="reveal-on-scroll reveal-delay-2 mt-6 max-w-lg text-base font-light leading-relaxed text-white/85 sm:mt-8 sm:text-lg md:text-xl"
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="reveal-on-scroll reveal-delay-3 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <a
            href={primaryHref}
            data-edit-key="hero.cta.primary"
            className="group inline-flex w-full min-h-[52px] items-center justify-center rounded-xl bg-primary px-7 py-4 text-base font-bold text-white shadow-[0_8px_30px_rgba(227,30,47,0.4)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_12px_40px_rgba(227,30,47,0.5)] hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:px-9 sm:text-lg"
          >
            <span className="inline-flex items-center gap-2.5 tracking-wide">
              {primaryCta}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
          <a
            href={secondaryHref}
            data-edit-key="hero.cta.secondary"
            className="inline-flex w-full min-h-[52px] items-center justify-center rounded-xl border-2 border-white/80 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-surface-dark hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:px-9 sm:text-lg"
          >
            <span className="tracking-wide">{secondaryCta}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
