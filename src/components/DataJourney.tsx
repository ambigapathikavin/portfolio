import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  Database, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Code2,
  Cpu,
  LineChart,
  Layers,
  Zap
} from 'lucide-react';
import { DATA_JOURNEY_STAGES } from '../data/portfolioData';

export const DataJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const currentStage = DATA_JOURNEY_STAGES[activeStep];

  return (
    <section id="data-journey" className="py-16 bg-[#050505] border-t border-[#ffffff08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#ffffff15] text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-2.5">
            <GitBranch className="w-3 h-3" />
            <span>INTERACTIVE LIFECYCLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The 9-Stage Data & AI Journey
          </h2>
          <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1 leading-relaxed">
            Click through each operational phase to explore how raw data streams are methodically transformed into production models and executive intelligence.
          </p>
        </div>

        {/* 9-Stage Horizontal Stepper Bar */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center min-w-[700px] justify-between p-1.5 rounded-xl bg-[#111111] border border-[#ffffff0a]">
            {DATA_JOURNEY_STAGES.map((stage, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = activeStep > idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all font-mono text-[10px] cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : isCompleted
                      ? 'text-[#C0C0C0] hover:text-white'
                      : 'text-[#666] hover:text-[#999]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-sm'
                      : isCompleted
                      ? 'bg-[#181818] text-cyan-400 border border-[#ffffff0a]'
                      : 'bg-[#141414] text-[#555] border border-[#ffffff06]'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="font-semibold tracking-wider text-[9px] uppercase">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Detailed Stage Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7 rounded-xl bg-[#111111] border border-[#ffffff08] shadow-lg backdrop-blur-sm"
          >
            
            {/* Left side details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#181818] border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                    STAGE 0{currentStage.stepNumber} OF 09
                  </span>
                  <span className="text-[10px] text-[#777] font-mono">
                    {currentStage.shortDesc}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {currentStage.title}: {currentStage.shortDesc}
                </h3>

                <p className="text-[#A3A3A3] text-xs sm:text-sm leading-relaxed mb-4">
                  {currentStage.detailedDesc}
                </p>
              </div>

              {/* Tools & Key Deliverable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#ffffff08]">
                <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff08]">
                  <div className="text-[9px] font-mono uppercase text-[#777] mb-1.5">
                    Primary Tools & Frameworks
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentStage.keyTools.map(tool => (
                      <span
                        key={tool}
                        className="px-1.5 py-0.5 rounded bg-[#181818] text-[10px] font-mono text-cyan-300 border border-[#ffffff0a]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff08]">
                  <div className="text-[9px] font-mono uppercase text-[#777] mb-1">
                    Key Deliverable
                  </div>
                  <div className="text-xs text-[#E0E0E0] font-medium mt-0.5 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{currentStage.deliverable}</span>
                  </div>
                </div>
              </div>

              {/* Navigation stepper buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] disabled:opacity-30 text-[#C0C0C0] text-xs font-mono transition-colors cursor-pointer"
                >
                  ← Previous Stage
                </button>

                <button
                  disabled={activeStep === DATA_JOURNEY_STAGES.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(DATA_JOURNEY_STAGES.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-black text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* Right side live code/syntax mockup */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#ffffff08] font-mono text-xs shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ffffff08] text-[#777] text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-1 text-[#888]">pipeline_stage_{currentStage.id}.py</span>
                  </div>
                  <Terminal className="w-3 h-3 text-cyan-400" />
                </div>

                <pre className="text-cyan-200/90 text-[11px] leading-relaxed overflow-x-auto p-2 bg-[#050505] rounded border border-[#ffffff04]">
                  {currentStage.codeSnippet}
                </pre>

                <div className="mt-3 pt-2 border-t border-[#ffffff08] flex items-center justify-between text-[9px] text-[#666]">
                  <span>Status: Operational</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Automated
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
