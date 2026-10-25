import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, BrainCircuit, Layers, Wrench } from 'lucide-react';
import { PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

const analystProjectCount = PROJECTS.filter(
  project => project.roleType === 'DATA_ANALYST' || project.roleType === 'BOTH'
).length;

const scientistProjectCount = PROJECTS.filter(
  project => project.roleType === 'DATA_SCIENTIST' || project.roleType === 'BOTH'
).length;

const overviewItems = [
  {
    label: 'Project case studies',
    value: PROJECTS.length,
    detail: 'Browse the complete project collection',
    icon: Layers,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    label: 'Analytics track',
    value: analystProjectCount,
    detail: 'BI, reporting, and business analysis',
    icon: BarChart3,
    color: 'text-sky-600 dark:text-sky-400',
  },
  {
    label: 'Data science & AI track',
    value: scientistProjectCount,
    detail: 'Machine learning, NLP, and AI',
    icon: BrainCircuit,
    color: 'text-violet-600 dark:text-violet-400',
  },
  {
    label: 'Skill groups',
    value: SKILL_CATEGORIES.length,
    detail: 'Explore tools by specialization',
    icon: Wrench,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
];

export const QuickStats: React.FC = () => (
  <section aria-labelledby="portfolio-overview-title" className="border-y border-slate-200 bg-slate-50 py-8 dark:border-white/10 dark:bg-[#090a0d]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h2 id="portfolio-overview-title" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
          Portfolio at a glance
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Counts are based on the projects and skill groups listed on this site.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {overviewItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111318]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5">
                <Icon aria-hidden="true" className={`h-5 w-5 ${item.color}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-2xl font-bold leading-none tracking-tight text-slate-900 dark:text-white">{item.value}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                <span className="mt-1 block text-sm leading-snug text-slate-600 dark:text-slate-400">{item.detail}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
