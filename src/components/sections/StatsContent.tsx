import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatProps {
  value: string;
  label: string;
  delay?: number;
  editKeyValue: string;
  editKeyLabel: string;
}

const StatCard: React.FC<StatProps> = ({ value, label, delay = 0, editKeyValue, editKeyLabel }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.7, once: true });

  const match = value.match(/^\D*(\d+(?:\.\d+)?)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : Number(value) || 0;
  const suffix = match ? match[2] : '';

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 120,
    damping: 20,
    mass: 0.6,
  });

  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (inView && targetNum > 0) {
      const timer = setTimeout(() => {
        motionValue.set(targetNum);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, targetNum, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (!inView) return;
      const rounded = Number.isInteger(targetNum) ? Math.round(v) : parseFloat(v.toFixed(1));
      if (v === 0 && targetNum === 0) {
        setDisplay(`${value}`);
      } else {
        setDisplay(`${rounded}${suffix}`);
      }
    });
    return () => unsubscribe();
  }, [spring, suffix, targetNum, value, inView]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: delay / 1000 }}
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
    </motion.div>
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
          delay={120}
          editKeyValue="stats.years"
          editKeyLabel="stats.yearsLabel"
        />
        <StatCard
          value={clients}
          label={clientsLabel}
          delay={240}
          editKeyValue="stats.clients"
          editKeyLabel="stats.clientsLabel"
        />
        <StatCard
          value={deals}
          label={dealsLabel}
          delay={360}
          editKeyValue="stats.deals"
          editKeyLabel="stats.dealsLabel"
        />
      </div>
    </div>
  );
};

