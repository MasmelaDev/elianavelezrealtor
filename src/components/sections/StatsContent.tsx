import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNativeInView } from '../../hooks/useNativeInView';

interface StatProps {
  value: string;
  label: string;
  delay?: number;
  editKeyValue: string;
  editKeyLabel: string;
}

const StatCard: React.FC<StatProps> = ({ value, label, delay = 0, editKeyValue, editKeyLabel }) => {
  const { ref, inView } = useNativeInView(0.7);

  const match = value.match(/^\D*(\d+(?:\.\d+)?)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : Number(value) || 0;
  const suffix = match ? match[2] : '';
  const isInteger = Number.isInteger(targetNum);

  const [display, setDisplay] = useState(value);
  const animatedRef = useRef(false);

  const animate = useCallback(() => {
    if (animatedRef.current || targetNum === 0) return;
    animatedRef.current = true;

    const duration = 1200; // ms
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetNum;
      const formatted = isInteger ? Math.round(current) : parseFloat(current.toFixed(1));
      setDisplay(`${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    setTimeout(() => requestAnimationFrame(tick), delay);
  }, [targetNum, suffix, isInteger, delay]);

  useEffect(() => {
    if (inView) animate();
  }, [inView, animate]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal-on-scroll flex flex-col items-center text-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className="font-serif text-4xl font-bold text-white drop-shadow-sm sm:text-5xl md:text-5xl"
        aria-hidden="true"
        data-edit-key={editKeyValue}
      >
        {display}
      </span>
      <span
        className="mt-1 text-sm font-semibold uppercase tracking-widest text-white/95 sm:text-base"
        data-edit-key={editKeyLabel}
      >
        {label}
      </span>
    </div>
  );
};

interface StatsContentProps {
  years: string;
  yearsLabel: string;
  clients: string;
  clientsLabel: string;
  deals: string;
  dealsLabel: string;
}

export const StatsContent: React.FC<StatsContentProps> = ({
  years,
  yearsLabel,
  clients,
  clientsLabel,
  deals,
  dealsLabel,
}) => {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10">
        <StatCard
          value={years}
          label={yearsLabel}
          delay={0}
          editKeyValue="stats.years"
          editKeyLabel="stats.yearsLabel"
        />
        <StatCard
          value={clients}
          label={clientsLabel}
          delay={100}
          editKeyValue="stats.clients"
          editKeyLabel="stats.clientsLabel"
        />
        <StatCard
          value={deals}
          label={dealsLabel}
          delay={200}
          editKeyValue="stats.deals"
          editKeyLabel="stats.dealsLabel"
        />
      </div>
    </div>
  );
};
