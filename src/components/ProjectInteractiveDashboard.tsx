import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, AreaChart, Area, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, Play, RefreshCw, CheckCircle2, 
  AlertCircle, Sparkles, Filter, Database, Cpu, Search, Layers, Zap, 
  Sliders, Activity, Users, FileText, ChevronRight, BarChart2, ShieldAlert, Award
} from 'lucide-react';
import { Project } from '../types';

interface DashboardProps {
  project: Project;
}

// 1. Sales Data
const SALES_REGIONAL_DATA = [
  { market: 'Delhi NCR', revenue: 382, profit: 42, margin: 11.0, zone: 'North' },
  { market: 'Mumbai', revenue: 295, profit: 24, margin: 8.1, zone: 'Central' },
  { market: 'Bengaluru', revenue: 168, profit: 31, margin: 18.5, zone: 'South' },
  { market: 'Hyderabad', revenue: 112, profit: 21, margin: 18.7, zone: 'South' },
  { market: 'Chennai', revenue: 94, profit: 16, margin: 17.0, zone: 'South' },
  { market: 'Kolkata', revenue: 64, profit: 4, margin: 6.2, zone: 'East' },
  { market: 'Ahmedabad', revenue: 58, profit: 8, margin: 13.8, zone: 'Central' }
];

const SALES_MONTHLY_TREND = [
  { month: 'Jan', revenue2019: 68, revenue2020: 79, profit: 11.2 },
  { month: 'Feb', revenue2019: 72, revenue2020: 84, profit: 12.1 },
  { month: 'Mar', revenue2019: 80, revenue2020: 92, profit: 13.8 },
  { month: 'Apr', revenue2019: 65, revenue2020: 71, profit: 9.8 },
  { month: 'May', revenue2019: 88, revenue2020: 104, profit: 16.2 },
  { month: 'Jun', revenue2019: 94, revenue2020: 112, profit: 18.0 }
];

// 2. Kitwe News NLP Sample Pre-built Headlines
const NLP_SAMPLE_HEADLINES = [
  { text: "Central Bank raises benchmark monetary policy rate to 11.5% to combat inflation", expectedTopic: "BUSINESS & FINANCE", confidence: 98.6 },
  { text: "Ministry of Health delivers 25,000 pediatric immunization doses to regional clinics", expectedTopic: "HEALTHCARE", confidence: 99.1 },
  { text: "National soccer squad secures historic 2-1 victory in continental tournament qualifiers", expectedTopic: "SPORTS", confidence: 99.4 },
  { text: "Parliament convenes debate on new infrastructure spending and energy transition bill", expectedTopic: "POLITICS & GOV", confidence: 97.8 },
  { text: "Researchers develop low-cost solar-powered water filtration units for rural cooperatives", expectedTopic: "SCIENCE & TECH", confidence: 98.2 }
];

// 3. Cricket Players Data
const CRICKET_PLAYERS_POOL = [
  { id: '1', name: 'Jos Buttler', role: 'Opener / Wk', avg: 36.2, sr: 144.5, impact: 92, country: 'ENG', selected: true },
  { id: '2', name: 'Alex Hales', role: 'Opener', avg: 34.0, sr: 147.2, impact: 89, country: 'ENG', selected: true },
  { id: '3', name: 'Virat Kohli', role: 'Anchor', avg: 52.7, sr: 138.1, impact: 96, country: 'IND', selected: true },
  { id: '4', name: 'Suryakumar Yadav', role: 'Middle / 360', avg: 44.8, sr: 181.6, impact: 98, country: 'IND', selected: true },
  { id: '5', name: 'Glenn Phillips', role: 'Finisher', avg: 32.5, sr: 156.4, impact: 88, country: 'NZ', selected: true },
  { id: '6', name: 'Hardik Pandya', role: 'All-Rounder', avg: 29.4, sr: 143.0, econ: 7.4, impact: 91, country: 'IND', selected: true },
  { id: '7', name: 'Sam Curran', role: 'All-Rounder', avg: 22.1, sr: 133.0, econ: 6.5, impact: 94, country: 'ENG', selected: true },
  { id: '8', name: 'Rashid Khan', role: 'Spin Bowler', econ: 6.2, sr_bowl: 14.1, impact: 95, country: 'AFG', selected: true },
  { id: '9', name: 'Wanindu Hasaranga', role: 'Spin Bowler', econ: 6.4, sr_bowl: 13.2, impact: 92, country: 'SL', selected: true },
  { id: '10', name: 'Shaheen Afridi', role: 'Pace Bowler', econ: 6.8, sr_bowl: 14.8, impact: 93, country: 'PAK', selected: true },
  { id: '11', name: 'Anrich Nortje', role: 'Express Pace', econ: 5.9, sr_bowl: 11.8, impact: 94, country: 'SA', selected: true },
  { id: '12', name: 'Glenn Maxwell', role: 'All-Rounder', avg: 27.8, sr: 151.0, econ: 7.8, impact: 85, country: 'AUS', selected: false },
  { id: '13', name: 'Trent Boult', role: 'Pace Bowler', econ: 6.6, sr_bowl: 15.2, impact: 88, country: 'NZ', selected: false }
];

export const ProjectInteractiveDashboard: React.FC<DashboardProps> = ({ project }) => {
  // Common states
  const [salesZoneFilter, setSalesZoneFilter] = useState<'All' | 'North' | 'South' | 'Central'>('All');
  const [newsInputText, setNewsInputText] = useState(NLP_SAMPLE_HEADLINES[0].text);
  const [newsPredictedTopic, setNewsPredictedTopic] = useState(NLP_SAMPLE_HEADLINES[0].expectedTopic);
  const [newsConfidence, setNewsConfidence] = useState(NLP_SAMPLE_HEADLINES[0].confidence);

  // Cricket State
  const [selectedSquad, setSelectedSquad] = useState<string[]>(
    CRICKET_PLAYERS_POOL.filter(p => p.selected).map(p => p.id)
  );

  // HR State
  const [hrDeptFilter, setHrDeptFilter] = useState<'All' | 'Engineering' | 'Sales' | 'Operations'>('All');

  // Medical NLP State
  const [prescriptionInput, setPrescriptionInput] = useState('Rx: Tab Amoxicillin 500mg PO TID with meals for 7 days. Cap Omeprazole 20mg PO QAM.');
  
  // Churn State
  const [churnTenure, setChurnTenure] = useState(6);
  const [churnMonthly, setChurnMonthly] = useState(85);
  const [churnSupportTickets, setChurnSupportTickets] = useState(4);
  const [churnContract, setChurnContract] = useState<'Month-to-Month' | 'One-Year' | 'Two-Year'>('Month-to-Month');

  // Credit Risk State
  const [creditIncome, setCreditIncome] = useState(65000);
  const [creditDti, setCreditDti] = useState(38);
  const [creditRevolving, setCreditRevolving] = useState(72);
  const [creditPastDelinq, setCreditPastDelinq] = useState(1);

  // E-Commerce State
  const [ecommerceSegment, setEcommerceSegment] = useState<'All' | 'Champions' | 'Loyal' | 'At Risk'>('All');

  // Handle news classifier live test
  const handleNewsClassify = (text: string) => {
    setNewsInputText(text);
    const lower = text.toLowerCase();
    if (lower.includes('rate') || lower.includes('inflation') || lower.includes('bank') || lower.includes('revenue') || lower.includes('market') || lower.includes('economy')) {
      setNewsPredictedTopic('BUSINESS & FINANCE');
      setNewsConfidence(98.6);
    } else if (lower.includes('health') || lower.includes('clinic') || lower.includes('dose') || lower.includes('vaccine') || lower.includes('medical')) {
      setNewsPredictedTopic('HEALTHCARE & MEDICINE');
      setNewsConfidence(99.2);
    } else if (lower.includes('soccer') || lower.includes('tournament') || lower.includes('champions') || lower.includes('cricket') || lower.includes('match')) {
      setNewsPredictedTopic('SPORTS & ATHLETICS');
      setNewsConfidence(99.5);
    } else if (lower.includes('parliament') || lower.includes('bill') || lower.includes('gov') || lower.includes('minister') || lower.includes('policy')) {
      setNewsPredictedTopic('POLITICS & GOVERNANCE');
      setNewsConfidence(97.8);
    } else {
      setNewsPredictedTopic('SCIENCE & INNOVATION');
      setNewsConfidence(98.1);
    }
  };

  // Toggle cricket squad selection
  const togglePlayer = (id: string) => {
    if (selectedSquad.includes(id)) {
      if (selectedSquad.length > 1) {
        setSelectedSquad(selectedSquad.filter(pId => pId !== id));
      }
    } else {
      if (selectedSquad.length < 11) {
        setSelectedSquad([...selectedSquad, id]);
      }
    }
  };

  // Churn calculation algorithm simulation
  const calcChurnProb = () => {
    let score = 0.20;
    if (churnContract === 'Month-to-Month') score += 0.35;
    if (churnContract === 'One-Year') score += 0.10;
    if (churnTenure < 12) score += 0.20;
    if (churnTenure > 36) score -= 0.15;
    if (churnMonthly > 70) score += 0.15;
    if (churnSupportTickets >= 3) score += 0.22;
    return Math.min(Math.max(score, 0.05), 0.96);
  };
  const churnProb = calcChurnProb();

  // Credit calculation algorithm simulation
  const calcCreditScore = () => {
    let base = 700;
    if (creditIncome > 80000) base += 40;
    if (creditIncome < 40000) base -= 50;
    if (creditDti > 45) base -= 60;
    else if (creditDti < 25) base += 35;
    if (creditRevolving > 80) base -= 75;
    else if (creditRevolving < 30) base += 40;
    if (creditPastDelinq > 0) base -= creditPastDelinq * 45;
    return Math.min(Math.max(Math.round(base), 350), 850);
  };
  const creditScoreVal = calcCreditScore();

  // Filtered sales data
  const filteredSalesData = salesZoneFilter === 'All' 
    ? SALES_REGIONAL_DATA 
    : SALES_REGIONAL_DATA.filter(d => d.zone === salesZoneFilter);

  return (
    <div className="rounded-xl bg-[#0d0d0d] border border-[#ffffff12] p-4 sm:p-6 overflow-hidden">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#ffffff0a] gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Interactive Analytics Console</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                LIVE METRICS
              </span>
            </div>
            <div className="text-[11px] text-[#888] font-mono">
              Direct telemetry & simulation for {project.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#A0A0A0]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Parameters Active</span>
        </div>
      </div>

      {/* DASHBOARD 1: SALES INSIGHTS */}
      {project.dashboardType === 'sales' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#141414] border border-[#ffffff0a]">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono text-[#999] mr-1">Zone Slicer:</span>
              {(['All', 'North', 'South', 'Central'] as const).map(zone => (
                <button
                  key={zone}
                  onClick={() => setSalesZoneFilter(zone)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    salesZoneFilter === zone
                      ? 'bg-cyan-500 text-black font-bold shadow-sm'
                      : 'bg-[#1e1e1e] text-[#bbb] hover:text-white'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-cyan-300">
              Filtered Revenue: <span className="font-bold text-white">₹{filteredSalesData.reduce((acc, c) => acc + c.revenue, 0)}M</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Regional Revenue Breakdown */}
            <div className="lg:col-span-7 p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white font-mono">Revenue by Market (₹ Millions)</span>
                <span className="text-[10px] text-[#666] font-mono">DAX: [Normalized Revenue]</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="market" stroke="#666" fontSize={10} tickLine={false} interval={0} angle={-25} textAnchor="end" />
                    <YAxis stroke="#666" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#161616', borderColor: '#333', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                      formatter={(val: any) => [`₹${val}M`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                      {filteredSalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.margin < 10 ? '#ef4444' : '#0ea5e9'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-[#888]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0ea5e9]" /> Healthy Margin (&gt;10%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Margin Leakage (&lt;10%)</span>
              </div>
            </div>

            {/* Profit Margin Trend */}
            <div className="lg:col-span-5 p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white font-mono">MoM Revenue vs Margin %</span>
                <span className="text-[10px] text-emerald-400 font-mono">+16% YoY</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SALES_MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" fontSize={10} tickLine={false} />
                    <YAxis stroke="#666" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#161616', borderColor: '#333', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                    <Area type="monotone" dataKey="revenue2020" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} name="2020 Revenue" />
                    <Line type="monotone" dataKey="revenue2019" stroke="#666" strokeDasharray="3 3" name="2019 Base" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[10px] font-mono text-[#888] mt-2">
                Identified recovery trajectory after price-band restructuring.
              </div>
            </div>
          </div>

          {/* DAX Formula Inspector */}
          <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#ffffff0a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400">
              <Sliders className="w-3.5 h-3.5" />
              <span>Core DAX Profit Measure:</span>
            </div>
            <code className="text-white bg-[#141414] px-2.5 py-1 rounded border border-[#ffffff08] overflow-x-auto">
              Profit Margin % = DIVIDE([Total Profit Margin (INR)], [Total Revenue (INR)], 0)
            </code>
          </div>
        </div>
      )}

      {/* DASHBOARD 2: KITWE NEWS CLASSIFIER NLP */}
      {project.dashboardType === 'news' && (
        <div className="space-y-6">
          {/* Real-time Prediction Sandbox */}
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                Live BERT Classifier Inference Sandbox
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Inference: 14.2ms</span>
            </div>

            <div className="space-y-2 mb-3">
              <label className="text-[10px] font-mono text-[#888]">Type or select any news headline to test classification:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newsInputText}
                  onChange={(e) => handleNewsClassify(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#ffffff15] text-white text-xs font-mono focus:border-violet-400 focus:outline-none"
                  placeholder="Enter sample news headline..."
                />
                <button
                  onClick={() => handleNewsClassify(newsInputText)}
                  className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run</span>
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="text-[9px] font-mono text-[#666]">Sample Feeds:</span>
              {NLP_SAMPLE_HEADLINES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNewsClassify(preset.text)}
                  className="px-2 py-0.5 rounded bg-[#161616] hover:bg-[#202020] border border-[#ffffff0a] text-[9px] font-mono text-[#bbb] hover:text-white transition-all cursor-pointer truncate max-w-[200px]"
                  title={preset.text}
                >
                  {preset.expectedTopic}
                </button>
              ))}
            </div>

            {/* Live Prediction Output Card */}
            <div className="p-3 rounded-lg bg-[#0a0a0a] border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold font-mono text-sm">
                  BERT
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#888] uppercase">Classified Category</div>
                  <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <span>{newsPredictedTopic}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#888]">Model Confidence</div>
                  <div className="text-base font-extrabold font-mono text-emerald-400">{newsConfidence}%</div>
                </div>
                <div className="w-20 h-2 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${newsConfidence}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Model Metrics Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { topic: 'Politics', precision: '98.4%', recall: '97.9%', f1: '0.981' },
              { topic: 'Business', precision: '98.9%', recall: '98.5%', f1: '0.987' },
              { topic: 'Healthcare', precision: '99.1%', recall: '97.4%', f1: '0.982' },
              { topic: 'Sports', precision: '99.5%', recall: '99.2%', f1: '0.993' }
            ].map(m => (
              <div key={m.topic} className="p-3 rounded-lg bg-[#111111] border border-[#ffffff08] text-center">
                <div className="text-xs font-bold text-white font-mono mb-1">{m.topic}</div>
                <div className="text-[10px] font-mono text-violet-300">F1: {m.f1}</div>
                <div className="text-[9px] font-mono text-[#777] mt-0.5">P: {m.precision} | R: {m.recall}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DASHBOARD 3: CRICKET T20 PLAYING 11 SIMULATOR */}
      {project.dashboardType === 'cricket' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#ffffff08] gap-2">
              <div>
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  Optimal Tournament Playing 11 Squad Builder
                </span>
                <p className="text-[10px] text-[#888] font-mono">Select candidate pool ({selectedSquad.length}/11 players selected)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-sky-300">
                  Calculated Squad Balance: <strong className="text-emerald-400">96.4 / 100</strong>
                </span>
              </div>
            </div>

            {/* Player Selection Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {CRICKET_PLAYERS_POOL.map(player => {
                const isChosen = selectedSquad.includes(player.id);
                return (
                  <button
                    key={player.id}
                    onClick={() => togglePlayer(player.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChosen
                        ? 'bg-sky-950/30 border-sky-500/50 text-white'
                        : 'bg-[#0e0e0e] border-[#ffffff08] text-[#888] hover:border-[#ffffff20]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span>{player.name}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#1f1f1f] text-sky-300">{player.country}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#888] mt-0.5">
                        {player.role} {player.avg ? `• Avg ${player.avg}` : ''} {player.sr ? `• SR ${player.sr}` : ''} {player.econ ? `• Econ ${player.econ}` : ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-mono font-bold text-sky-400">{player.impact} pts</div>
                      <div className="text-[9px] font-mono text-[#666]">{isChosen ? 'Selected' : 'Bench'}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 4: HR ATTENDANCE & WORKFORCE */}
      {project.dashboardType === 'hr' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
              <div className="text-[10px] font-mono text-[#888] uppercase">Presence Rate</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">93.4%</div>
              <div className="text-[9px] font-mono text-[#666] mt-1">+7.3% vs baseline year</div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
              <div className="text-[10px] font-mono text-[#888] uppercase">WFH Utilization</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">24.6%</div>
              <div className="text-[9px] font-mono text-[#666] mt-1">Concentrated on Mon / Fri</div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#111111] border border-[#ffffff08]">
              <div className="text-[10px] font-mono text-[#888] uppercase">Administrative Time Saved</div>
              <div className="text-xl font-bold font-mono text-violet-400 mt-0.5">3.5 hrs/day</div>
              <div className="text-[9px] font-mono text-[#666] mt-1">Automated ETL & DAX</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-3">Day-of-Week Attendance Distribution (%)</div>
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { day: 'Mon', present: 88, wfh: 38, leave: 4 },
                { day: 'Tue', present: 96, wfh: 12, leave: 2 },
                { day: 'Wed', present: 97, wfh: 10, leave: 1 },
                { day: 'Thu', present: 95, wfh: 15, leave: 2 },
                { day: 'Fri', present: 86, wfh: 44, leave: 6 }
              ].map(d => (
                <div key={d.day} className="p-2.5 rounded bg-[#0a0a0a] border border-[#ffffff08]">
                  <div className="text-xs font-bold font-mono text-white mb-1">{d.day}</div>
                  <div className="text-[10px] font-mono text-emerald-400">{d.present}% In-Office</div>
                  <div className="text-[9px] font-mono text-cyan-400">{d.wfh}% WFH</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 5: MEDICAL NLP NER */}
      {project.dashboardType === 'prescription' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Clinical Named Entity Recognition Sandbox</span>
            </div>

            <div className="mb-3">
              <label className="text-[10px] font-mono text-[#888]">Prescription String Input:</label>
              <textarea
                rows={2}
                value={prescriptionInput}
                onChange={(e) => setPrescriptionInput(e.target.value)}
                className="w-full mt-1 p-2.5 rounded-lg bg-[#0a0a0a] border border-[#ffffff15] text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Extracted Entities View */}
            <div className="p-3.5 rounded-lg bg-[#0a0a0a] border border-[#ffffff0a] space-y-3">
              <div className="text-[10px] font-mono text-[#888] uppercase">Identified Entity Tokens:</div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  <strong className="text-white">Amoxicillin</strong> [DRUG]
                </span>
                <span className="px-2 py-1 rounded bg-violet-950/80 border border-violet-500/40 text-violet-300">
                  <strong className="text-white">500mg</strong> [DOSAGE]
                </span>
                <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  <strong className="text-white">PO (Orally)</strong> [ROUTE]
                </span>
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300">
                  <strong className="text-white">TID (3x Daily)</strong> [FREQ]
                </span>
                <span className="px-2 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300">
                  <strong className="text-white">7 days</strong> [DURATION]
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 6: CHURN PREDICTION */}
      {project.dashboardType === 'churn' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-4 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Subscriber Risk & SHAP Explainer Simulator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Tenure (Months)</span>
                  <span className="text-white font-bold">{churnTenure} mo</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={72}
                  value={churnTenure}
                  onChange={(e) => setChurnTenure(Number(e.target.value))}
                  className="w-full mt-1.5 accent-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Monthly Charges</span>
                  <span className="text-white font-bold">${churnMonthly}/mo</span>
                </label>
                <input
                  type="range"
                  min={20}
                  max={120}
                  value={churnMonthly}
                  onChange={(e) => setChurnMonthly(Number(e.target.value))}
                  className="w-full mt-1.5 accent-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Support Tickets</span>
                  <span className="text-white font-bold">{churnSupportTickets}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={churnSupportTickets}
                  onChange={(e) => setChurnSupportTickets(Number(e.target.value))}
                  className="w-full mt-1.5 accent-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] block mb-1">Contract Type</label>
                <select
                  value={churnContract}
                  onChange={(e: any) => setChurnContract(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-[#0a0a0a] border border-[#ffffff15] text-xs font-mono text-white"
                >
                  <option value="Month-to-Month">Month-to-Month</option>
                  <option value="One-Year">One-Year Contract</option>
                  <option value="Two-Year">Two-Year Contract</option>
                </select>
              </div>
            </div>

            {/* Churn Probability Gauge Output */}
            <div className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              churnProb > 0.45 ? 'bg-red-950/20 border-red-500/40' : 'bg-emerald-950/20 border-emerald-500/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-lg ${
                  churnProb > 0.45 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                }`}>
                  {Math.round(churnProb * 100)}%
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#888] uppercase">Calculated Churn Probability</div>
                  <div className="text-sm font-bold text-white font-mono">
                    {churnProb > 0.45 ? 'HIGH RISK SUBSCRIBER — Trigger VIP Retention' : 'LOW RISK SUBSCRIBER — Healthy Account'}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#aaa]">
                Top SHAP Driver: <span className="text-white font-bold">{churnContract === 'Month-to-Month' ? '+0.32 Contract Type' : '-0.24 Long Tenure'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 7: CREDIT RISK */}
      {project.dashboardType === 'credit' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
              <span>Automated Credit Underwriting & Default Risk Scoring Console</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Annual Income</span>
                  <span className="text-white font-bold">${(creditIncome/1000).toFixed(0)}k</span>
                </label>
                <input
                  type="range"
                  min={20000}
                  max={150000}
                  step={5000}
                  value={creditIncome}
                  onChange={(e) => setCreditIncome(Number(e.target.value))}
                  className="w-full mt-1.5 accent-teal-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Debt-to-Income (DTI)</span>
                  <span className="text-white font-bold">{creditDti}%</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  value={creditDti}
                  onChange={(e) => setCreditDti(Number(e.target.value))}
                  className="w-full mt-1.5 accent-teal-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Revolving Line Util.</span>
                  <span className="text-white font-bold">{creditRevolving}%</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={creditRevolving}
                  onChange={(e) => setCreditRevolving(Number(e.target.value))}
                  className="w-full mt-1.5 accent-teal-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#888] flex justify-between">
                  <span>Past Delinquencies</span>
                  <span className="text-white font-bold">{creditPastDelinq} events</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={creditPastDelinq}
                  onChange={(e) => setCreditPastDelinq(Number(e.target.value))}
                  className="w-full mt-1.5 accent-teal-400"
                />
              </div>
            </div>

            {/* Scorecard Output */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#888]">Generated Credit Rating</div>
                <div className="text-2xl font-extrabold font-mono text-teal-300">{creditScoreVal} / 850</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  creditScoreVal >= 680
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : creditScoreVal >= 580
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-red-500/20 border-red-500 text-red-300'
                }`}>
                  {creditScoreVal >= 680 ? 'AUTO-APPROVED' : creditScoreVal >= 580 ? 'MANUAL UNDERWRITING' : 'DECLINED'}
                </span>
                <span className="text-[10px] font-mono text-[#888]">
                  PD: {((850 - creditScoreVal) / 850 * 12).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 8: E-COMMERCE COHORT */}
      {project.dashboardType === 'ecommerce' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-3">
              Monthly Customer Cohort Retention Heatmap (%)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] font-mono text-center">
                <thead>
                  <tr className="text-[#888] border-b border-[#222]">
                    <th className="p-2 text-left">Cohort</th>
                    <th className="p-2">Users</th>
                    <th className="p-2">M0</th>
                    <th className="p-2">M1</th>
                    <th className="p-2">M2</th>
                    <th className="p-2">M3</th>
                    <th className="p-2">M6</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cohort: 'Jan 2024', users: '12,400', m0: '100%', m1: '41.2%', m2: '34.8%', m3: '29.4%', m6: '24.1%' },
                    { cohort: 'Feb 2024', users: '14,100', m0: '100%', m1: '43.5%', m2: '36.1%', m3: '31.2%', m6: '26.8%' },
                    { cohort: 'Mar 2024', users: '15,800', m0: '100%', m1: '45.0%', m2: '38.4%', m3: '33.0%', m6: '28.5%' }
                  ].map(row => (
                    <tr key={row.cohort} className="border-b border-[#181818]">
                      <td className="p-2 text-left font-bold text-white">{row.cohort}</td>
                      <td className="p-2 text-[#aaa]">{row.users}</td>
                      <td className="p-2 bg-pink-950/40 text-pink-300">{row.m0}</td>
                      <td className="p-2 bg-pink-900/30 text-pink-200">{row.m1}</td>
                      <td className="p-2 bg-pink-900/20 text-[#ddd]">{row.m2}</td>
                      <td className="p-2 bg-pink-950/20 text-[#bbb]">{row.m3}</td>
                      <td className="p-2 text-[#888]">{row.m6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 9: HEALTHCARE SUDAN GIS */}
      {project.dashboardType === 'healthcare' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#111111] border border-[#ffffff08]">
            <div className="text-xs font-bold text-white font-mono mb-3">
              Regional Healthcare Facility Deficit Index by State
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-[#0a0a0a] border border-blue-500/30">
                <div className="text-[#888] text-[10px]">Khartoum State (Capital)</div>
                <div className="text-base font-bold text-white mt-1">2.8 Beds / 10k</div>
                <div className="text-emerald-400 text-[10px] mt-0.5">High Density Center</div>
              </div>
              <div className="p-3 rounded bg-[#0a0a0a] border border-amber-500/30">
                <div className="text-[#888] text-[10px]">Kassala / Gezira</div>
                <div className="text-base font-bold text-white mt-1">1.1 Beds / 10k</div>
                <div className="text-amber-300 text-[10px] mt-0.5">Moderate Deficit</div>
              </div>
              <div className="p-3 rounded bg-[#0a0a0a] border border-red-500/30">
                <div className="text-[#888] text-[10px]">Darfur & Blue Nile</div>
                <div className="text-base font-bold text-white mt-1">0.3 Beds / 10k</div>
                <div className="text-red-400 text-[10px] mt-0.5">Severe Care Desert (&gt;50km)</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
