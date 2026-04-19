import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

interface Props {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export default function TestimonialsContent({ title, subtitle, testimonials }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="bg-surface-gray py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
      <div className="absolute -left-[20%] top-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-160px' }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="mb-4 inline-block rounded-full bg-surface border border-gray-200 px-5 py-2 text-sm font-bold uppercase tracking-widest text-primary shadow-sm hover:shadow-md transition-shadow">
              Client Stories
            </div>
            <h2 data-edit-key="testimonials.title" className="mt-4 font-serif text-4xl font-bold text-on-surface md:text-5xl lg:text-6xl max-w-3xl mx-auto">
              {title}
            </h2>
            <p data-edit-key="testimonials.subtitle" className="mt-6 text-lg text-on-surface-muted max-w-2xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-140px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              variants={item}
              className={`relative bg-surface p-10 rounded-3xl border border-gray-100 shadow-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(15,42,61,0.08)] hover:-translate-y-2 group flex flex-col justify-between ${
                idx === 1 ? 'lg:translate-y-8' : ''
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-gray-200/50 group-hover:text-primary/10 transition-colors duration-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-6" data-edit-key={`testimonials.${t.id}.rating`}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < t.rating ? 'text-accent' : 'text-gray-200'} transition-transform duration-300 group-hover:scale-110`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p data-edit-key={`testimonials.${t.id}.content`} className="text-on-surface-muted text-lg leading-relaxed mb-10 flex-grow font-serif italic text-pretty">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-surface shadow-md" data-edit-key={`testimonials.${t.id}.image`}>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0F2A3D&color=fff`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 data-edit-key={`testimonials.${t.id}.name`} className="font-bold text-on-surface text-lg leading-tight">{t.name}</h4>
                    <p data-edit-key={`testimonials.${t.id}.role`} className="text-sm font-medium text-primary uppercase tracking-wide mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
