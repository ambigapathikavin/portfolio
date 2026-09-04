import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Filter, 
  Cpu, 
  BrainCircuit, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  category: string;
  icon: React.ReactNode;
  tools: string[];
  summary: string;
  metrics?: string;
}

interface PipelineFlowchartProps {
  category?: string;
  projectTitle: string;
}

export const PipelineFlowchart: React.FC<PipelineFlowchartProps> = ({ 
  category = 'MACHINE LEARNING',
  projectTitle 
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const isDataAnalystProject = 
    category.toUpperCase().includes('BUSINESS') || 
    category.toUpperCase().includes('ANALYTICS') || 
    category.toUpperCase().includes('SQL') || 
    category.toUpperCase().includes('POWER BI');

  const stages: Stage[] = isDataAnalystProject ? [
    {
      id: 0,
      name: '1. Ingestion',
      category: 'DATA EXTRACT',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      tools: ['SQL Server', 'REST APIs', 'OLTP Schemas'],
      summary: 'Automated extraction of multi-table transactional records with schema validation and automated deduplication.',
      metrics: 'Zero-drop ETL'
    },
    {
      id: 1,
      name: '2. Transformation',
      category: 'DATA WRANGLING',
      icon: <Filter className="w-4 h-4 text-sky-400" />,
      tools: ['Power Query', 'Pandas', 'dbt'],
      summary: 'Cleaning anomalies, handling currency normalization, and standardizing date dimensions into a Star Schema.',
      metrics: '100% Star Schema'
    },
    {
      id: 2,
      name: '3. Data Modeling',
      category: 'SEMANTIC LAYER',
      icon: <Layers className="w-4 h-4 text-violet-400" />,
      tools: ['DAX', 'Power BI Engine', 'Fact/Dim Tables'],
      summary: 'Establishing 1-to-many relationship cardinalities, dynamic time-intelligence measures, and YoY variances.',
      metrics: 'Dynamic DAX'
    },
    {
      id: 3,
      name: '4. KPI Intelligence',
      category: 'ANALYTICAL SYNTHESIS',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      tools: ['Statistical Testing', 'Pareto Analysis', 'Cohort Matrix'],
      summary: 'Surfacing hidden revenue leaks, high-margin customer cohorts, and regional under-performance trends.',
      metrics: 'Automated Insights'
    },
    {
      id: 4,
      name: '5. Executive BI',
      category: 'DEPLOYMENT & ROI',
      icon: <Rocket className="w-4 h-4 text-emerald-400" />,
      tools: ['Power BI Service', 'RLS Security', 'Automated Refresh'],
      summary: 'Live drill-through reports delivered to CXOs with role-based access control and scheduled automated cloud sync.',
      metrics: 'Sub-second Latency'
    }
  ] : [
    {
      id: 0,
      name: '1. Data Pipeline',
      category: 'SOURCE INGESTION',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      tools: ['SQL', 'Web Scraping', 'CSV / APIs'],
      summary: 'Ingestion of raw multi-modal and tabular datasets with strict schema enforcement and null imputation.',
      metrics: 'Validated Pipeline'
    },
    {
      id: 1,
      name: '2. Preprocessing & EDA',
      category: 'FEATURE CLEANING',
      icon: <Filter className="w-4 h-4 text-sky-400" />,
      tools: ['Pandas', 'NumPy', 'Seaborn'],
      summary: 'Deep distribution checks, outlier pruning, multi-collinearity VIF scoring, and automated text tokenization.',
      metrics: 'Outlier Pruned'
    },
    {
      id: 2,
      name: '3. Feature Engineering',
      category: 'REPRESENTATION',
      icon: <Layers className="w-4 h-4 text-violet-400" />,
      tools: ['Scikit-Learn', 'BERT Embeddings', 'StandardScaler'],
      summary: 'Constructing interaction ratios, temporal window aggregations, and high-dimensional semantic vector spaces.',
      metrics: 'Optimized Features'
    },
    {
      id: 3,
      name: '4. Model Inference',
      category: 'TRAINING & TUNING',
      icon: <BrainCircuit className="w-4 h-4 text-amber-400" />,
      tools: ['PyTorch / BERT', 'XGBoost', 'Optuna Tuning'],
      summary: 'Stratified cross-validation with hyperparameter optimization, SHAP interpretability, and loss curve monitoring.',
      metrics: 'Cross-Validated'
    },
    {
      id: 4,
      name: '5. Live Serving',
      category: 'PRODUCTION ML',
      icon: <Rocket className="w-4 h-4 text-emerald-400" />,
      tools: ['Streamlit', 'Docker', 'FastAPI REST'],
      summary: 'Containerized interactive deployment with real-time inference simulators, health monitors, and reproducible pipelines.',
      metrics: '<80ms Response'
    }
  ];

  const current = stages[activeStage];

  return (
    <div className="p-5 rounded-xl bg-[#111111] border border-[#ffffff10] shadow-xl overflow-hidden mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-[#ffffff0a]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
              End-to-End Technical Architecture Flowchart
            </h4>
          </div>
          <p className="text-[11px] text-[#888] font-mono mt-0.5">
            Interactive pipeline execution flow for <span className="text-cyan-300 font-semibold">{projectTitle}</span>
          </p>
        </div>

        <div className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/25 self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Click any node to inspect</span>
        </div>
      </div>

      {/* Horizontal Flowchart Nodes */}
      <div className="relative">
        
        {/* Glowing connector track on desktop */}
        <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-500/40 z-0" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#181818] border-cyan-500/80 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                    : 'bg-[#0a0a0a] hover:bg-[#141414] border-[#ffffff0f] hover:border-cyan-500/40'
                }`}
              >
                {/* Stage Icon Node */}
                <div 
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-all shrink-0 ${
                    isSelected 
                      ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/30' 
                      : 'bg-[#181818] border border-[#ffffff15] text-[#888] group-hover:text-white group-hover:border-cyan-500/30'
                  }`}
                >
                  {stage.icon}
                </div>

                <span className="text-[10px] font-mono text-[#777] uppercase tracking-wider mb-0.5">
                  {stage.category}
                </span>

                <span className={`text-xs font-mono font-bold leading-tight ${isSelected ? 'text-cyan-300' : 'text-[#ddd]'}`}>
                  {stage.name}
                </span>

                <span className="text-[9px] font-mono text-emerald-400/90 mt-1 bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#ffffff08]">
                  {stage.metrics}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <motion.div 
        key={activeStage}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4 p-4 rounded-xl bg-[#0c1218] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
            {current.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold font-mono text-white">
                {current.name}: {current.category}
              </span>
              <div className="flex flex-wrap gap-1">
                {current.tools.map((tool) => (
                  <span key={tool} className="px-2 py-0.5 rounded bg-[#162330] border border-cyan-500/25 text-[10px] font-mono text-cyan-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-[#A0B0C0] mt-1.5 leading-relaxed">
              {current.summary}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 self-end md:self-auto text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Stage {activeStage + 1} of 5 Active</span>
        </div>
      </motion.div>

    </div>
  );
};
