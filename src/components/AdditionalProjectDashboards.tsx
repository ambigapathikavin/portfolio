import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, AreaChart, Area, Cell 
} from 'recharts';
import { 
  Waves, AlertTriangle, ShieldCheck, Cpu, MessageSquare, 
  FileText, Leaf, Hotel, ShoppingBag, Sparkles, Filter, Play, 
  RefreshCw, CheckCircle2, ChevronRight, Activity, ArrowUpRight, Zap,
  Camera, Scan, Eye, ZoomIn
} from 'lucide-react';
import { Project } from '../types';
import { trackSimulatorAction } from '../utils/analytics';

interface AdditionalDashboardProps {
  project: Project;
}

export const AdditionalProjectDashboards: React.FC<AdditionalDashboardProps> = ({ project }) => {
  // 1. Flood State
  const [floodNdwiThresh, setFloodNdwiThresh] = useState(0.18);
  const [floodRainfallMm, setFloodRainfallMm] = useState(140);
  const [floodDamDischarge, setFloodDamDischarge] = useState(3400);

  // 2. San Jose Chronic Disease State
  const [diseaseTract, setDiseaseTract] = useState<'East San Jose' | 'Downtown' | 'Alum Rock' | 'Willow Glen'>('East San Jose');
  const [diseasePovertyPct, setDiseasePovertyPct] = useState(24);
  const [diseaseFoodDesert, setDiseaseFoodDesert] = useState(true);
  const [diseaseUninsuredPct, setDiseaseUninsuredPct] = useState(16);

  // 3. Network Intrusion Detection State
  const [secPacketRate, setSecPacketRate] = useState(3800);
  const [secSynRatio, setSecSynRatio] = useState(68);
  const [secAvgPacketBytes, setSecAvgPacketBytes] = useState(96);
  const [secProtocol, setSecProtocol] = useState<'TCP' | 'UDP' | 'ICMP'>('TCP');

  // 4. Chatbot RAG State
  const [ragQuery, setRagQuery] = useState('How does vector search prevent model hallucination?');
  const [ragTopK, setRagTopK] = useState(3);
  const [ragSimilarityThreshold, setRagSimilarityThreshold] = useState(0.78);

  // 5. Content Moderation State
  const [modCommentText, setModCommentText] = useState('This whole proposal is utterly stupid and you should be fired immediately!');
  const [modSensitivity, setModSensitivity] = useState(50);

  // 6. Text Summarization State
  const [sumLengthTarget, setSumLengthTarget] = useState<'Short' | 'Medium' | 'Bullets'>('Short');
  const [sumTemperature, setSumTemperature] = useState(0.3);

  // 7. Tomato Crop Leaf Disease State
  const [tomatoSelectedDisease, setTomatoSelectedDisease] = useState<'Early Blight' | 'Late Blight' | 'Yellow Leaf Curl Virus' | 'Leaf Mold' | 'Healthy'>('Early Blight');
  const [tomatoConfidenceFloor, setTomatoConfidenceFloor] = useState(85);
  const [tomatoViewMode, setTomatoViewMode] = useState<'specimen' | 'gradcam'>('specimen');
  const [tomatoInspectionZoom, setTomatoInspectionZoom] = useState(false);

  // 8. Hospitality BI State
  const [hospAdr, setHospAdr] = useState(8800);
  const [hospOccupancyPct, setHospOccupancyPct] = useState(74);
  const [hospDirectBookingPct, setHospDirectBookingPct] = useState(34);

  // 9. Diwali Festive Sales State
  const [diwaliGender, setDiwaliGender] = useState<'Female' | 'Male'>('Female');
  const [diwaliAgeGroup, setDiwaliAgeGroup] = useState<'26-35' | '18-25' | '36-45' | '46+'>('26-35');
  const [diwaliOccupation, setDiwaliOccupation] = useState<'IT' | 'Healthcare' | 'Aviation' | 'Banking'>('IT');

  // ==========================================
  // 1. FLOOD MAPPING MEKONG
  // ==========================================
  if (project.dashboardType === 'flood') {
    const inundatedKm2 = Math.round(1600 + (floodRainfallMm * 4.8) + (floodDamDischarge / 10) - (floodNdwiThresh * 800));
    const displacedPop = Math.round(inundatedKm2 * 18.5);
    const criticalZonesAtRisk = Math.min(18, Math.max(2, Math.round((inundatedKm2 - 1400) / 110)));
    const iouMetric = Math.max(88, Math.min(94.2, 91.4 - (floodNdwiThresh - 0.18) * 6));

    const floodElevationData = [
      { elevation: '0-2m Lowland', normalWater: 420, currentWater: Math.round(inundatedKm2 * 0.45), risk: 'Severe' },
      { elevation: '2-5m Floodplain', normalWater: 310, currentWater: Math.round(inundatedKm2 * 0.32), risk: 'High' },
      { elevation: '5-10m Terrace', normalWater: 140, currentWater: Math.round(inundatedKm2 * 0.16), risk: 'Moderate' },
      { elevation: '10m+ Highland', normalWater: 30, currentWater: Math.round(inundatedKm2 * 0.07), risk: 'Minimal' },
    ];

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-cyan-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Sentinel-2 Satellite Flood Extent & NDWI Inundation Simulator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
              Omdena Mekong Basin Model
            </span>
          </div>

          {/* Interactive Input Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-3.5 rounded-lg bg-[#111] border border-[#222]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888]">NDWI Water Threshold</span>
                <span className="text-cyan-300 font-bold">{floodNdwiThresh.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.01"
                value={floodNdwiThresh}
                onChange={(e) => {
                  setFloodNdwiThresh(parseFloat(e.target.value));
                  trackSimulatorAction(project.id, 'flood', 'ndwi_change', { threshold: e.target.value });
                }}
                className="w-full accent-cyan-400"
              />
              <div className="text-[10px] text-[#666] mt-1">Lower = catches shallow mudflats; Higher = permanent bodies</div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#111] border border-[#222]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888]">24h Monsoon Rainfall</span>
                <span className="text-cyan-300 font-bold">{floodRainfallMm} mm</span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="10"
                value={floodRainfallMm}
                onChange={(e) => {
                  setFloodRainfallMm(parseInt(e.target.value, 10));
                  trackSimulatorAction(project.id, 'flood', 'rainfall_change', { mm: e.target.value });
                }}
                className="w-full accent-cyan-400"
              />
              <div className="text-[10px] text-[#666] mt-1">Monsoon precipitation spike across watershed</div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#111] border border-[#222]">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-[#888]">Upstream Dam Discharge</span>
                <span className="text-cyan-300 font-bold">{floodDamDischarge} m³/s</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="200"
                value={floodDamDischarge}
                onChange={(e) => {
                  setFloodDamDischarge(parseInt(e.target.value, 10));
                  trackSimulatorAction(project.id, 'flood', 'dam_discharge', { m3s: e.target.value });
                }}
                className="w-full accent-cyan-400"
              />
              <div className="text-[10px] text-[#666] mt-1">Controlled overflow from upstream reservoirs</div>
            </div>
          </div>

          {/* Realtime KPI Output Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-[#121212] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888]">Total Inundated Area</div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">{inundatedKm2.toLocaleString()} km²</div>
              <div className="text-[10px] text-[#555] mt-0.5">Mekong flood basin</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121212] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888]">Evacuation Priority</div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">{displacedPop.toLocaleString()}</div>
              <div className="text-[10px] text-[#555] mt-0.5">Vulnerable residents</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121212] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888]">High-Risk Sectors</div>
              <div className="text-xl font-bold font-mono text-rose-300 mt-1">{criticalZonesAtRisk} Districts</div>
              <div className="text-[10px] text-[#555] mt-0.5">Crop & bridge threats</div>
            </div>
            <div className="p-3 rounded-lg bg-[#121212] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888]">Model IoU Precision</div>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">{iouMetric.toFixed(1)}%</div>
              <div className="text-[10px] text-[#555] mt-0.5">Validation against Ground Truth</div>
            </div>
          </div>

          {/* Elevation Bar Chart */}
          <div>
            <div className="text-xs font-mono text-[#888] mb-2 flex items-center justify-between">
              <span>Inundation by Elevation Tier (SRTM 30m vs Sentinel-2 Detection)</span>
              <span className="text-[10px] text-cyan-400">Values in km²</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={floodElevationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="elevation" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="normalWater" fill="#0369a1" name="Baseline Water (km²)" />
                  <Bar dataKey="currentWater" fill="#06b6d4" name="Simulated Flood (km²)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. CHRONIC DISEASES SAN JOSE
  // ==========================================
  if (project.dashboardType === 'disease') {
    const tractMultiplier = diseaseTract === 'East San Jose' ? 1.35 : diseaseTract === 'Downtown' ? 1.15 : diseaseTract === 'Alum Rock' ? 1.25 : 0.82;
    const baseDiabetes = (diseasePovertyPct * 0.38 + (diseaseFoodDesert ? 3.8 : 0) + diseaseUninsuredPct * 0.22) * tractMultiplier;
    const predDiabetesRate = Math.min(22.4, Math.max(5.1, baseDiabetes)).toFixed(1);
    const predHypertensionRate = (parseFloat(predDiabetesRate) * 1.8 + 8.2).toFixed(1);
    const clinicPriorityScore = Math.min(100, Math.round(parseFloat(predDiabetesRate) * 4.2 + (diseaseFoodDesert ? 15 : 0)));

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-emerald-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                San Jose Chronic Disease & Health Equity Risk Simulator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              CDC 500 Cities & ACS Model
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Target Census Tract</label>
              <select
                value={diseaseTract}
                onChange={(e) => {
                  setDiseaseTract(e.target.value as any);
                  trackSimulatorAction(project.id, 'disease', 'tract_change', { tract: e.target.value });
                }}
                className="w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-xs font-mono text-white focus:border-emerald-500"
              >
                <option value="East San Jose">East San Jose (Tract 5012)</option>
                <option value="Downtown">Downtown (Tract 5004)</option>
                <option value="Alum Rock">Alum Rock (Tract 5028)</option>
                <option value="Willow Glen">Willow Glen (Tract 5040)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Poverty Rate: {diseasePovertyPct}%</label>
              <input
                type="range"
                min="5"
                max="40"
                value={diseasePovertyPct}
                onChange={(e) => setDiseasePovertyPct(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 mt-2"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Uninsured Rate: {diseaseUninsuredPct}%</label>
              <input
                type="range"
                min="3"
                max="30"
                value={diseaseUninsuredPct}
                onChange={(e) => setDiseaseUninsuredPct(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 mt-2"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Food Desert Zone</label>
              <button
                type="button"
                onClick={() => setDiseaseFoodDesert(!diseaseFoodDesert)}
                className={`w-full py-2 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  diseaseFoodDesert 
                    ? 'bg-rose-950/60 border border-rose-500/40 text-rose-300' 
                    : 'bg-[#161616] border border-[#333] text-[#888]'
                }`}
              >
                {diseaseFoodDesert ? 'Yes (No fresh grocer within 1 mi)' : 'No (Adequate Fresh Food)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111] border border-[#222]">
            <div>
              <div className="text-[11px] font-mono text-[#888]">Predicted Diabetes Rate</div>
              <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">{predDiabetesRate}%</div>
              <div className="text-[10px] text-[#555]">Adult population</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Projected Hypertension</div>
              <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{predHypertensionRate}%</div>
              <div className="text-[10px] text-[#555]">Prevalence index</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Intervention Priority</div>
              <div className={`text-2xl font-bold font-mono mt-1 ${clinicPriorityScore > 75 ? 'text-rose-400' : 'text-amber-300'}`}>
                {clinicPriorityScore}/100
              </div>
              <div className="text-[10px] text-[#555]">{clinicPriorityScore > 75 ? 'Urgent Need' : 'Standard Routine'}</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Recommended Action</div>
              <div className="text-xs font-mono font-bold text-white mt-1">
                {diseaseFoodDesert ? 'Mobile Clinic + Food Voucher' : 'Preventive Screening Van'}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Tract {diseaseTract}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. NETWORK SECURITY INTRUSION PREDICTION
  // ==========================================
  if (project.dashboardType === 'security') {
    const isDDoS = secPacketRate > 5000 && secSynRatio > 60;
    const isPortScan = secAvgPacketBytes < 80 && secPacketRate > 2000;
    const isMalicious = isDDoS || isPortScan || (secSynRatio > 80);
    const threatScore = Math.min(99.4, Math.max(2.1, (secPacketRate / 80) + (secSynRatio * 0.45) - (secAvgPacketBytes * 0.15))).toFixed(1);
    const classification = isDDoS ? 'DDoS SYN Flood Attack' : isPortScan ? 'Stealth Reconnaissance Port Scan' : isMalicious ? 'Suspicious Flow Anomaly' : 'Normal Benign Traffic';

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-rose-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Network Intrusion Detection & Real-Time Threat Classifier
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-mono">
              CIC-IDS Machine Learning Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>Packet Flow Rate</span>
                <span className="text-white font-bold">{secPacketRate} pkts/s</span>
              </div>
              <input
                type="range"
                min="400"
                max="10000"
                step="200"
                value={secPacketRate}
                onChange={(e) => setSecPacketRate(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>TCP SYN Flag Ratio</span>
                <span className="text-white font-bold">{secSynRatio}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="98"
                value={secSynRatio}
                onChange={(e) => setSecSynRatio(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>Avg Packet Length</span>
                <span className="text-white font-bold">{secAvgPacketBytes} B</span>
              </div>
              <input
                type="range"
                min="40"
                max="1500"
                step="20"
                value={secAvgPacketBytes}
                onChange={(e) => setSecAvgPacketBytes(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="text-xs font-mono text-[#888] mb-1">Transport Protocol</div>
              <div className="flex gap-1.5 mt-2">
                {(['TCP', 'UDP', 'ICMP'] as const).map((proto) => (
                  <button
                    key={proto}
                    type="button"
                    onClick={() => setSecProtocol(proto)}
                    className={`flex-1 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                      secProtocol === proto ? 'bg-rose-500 text-white' : 'bg-[#181818] text-[#888]'
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111] border border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#888]">Classification Outcome</div>
              <div className={`text-xl font-bold font-mono mt-1 ${isMalicious ? 'text-rose-400' : 'text-emerald-400'}`}>
                {classification}
              </div>
              <div className="text-xs text-[#666] mt-0.5">Inference Latency: 8.4ms | Inspection Flow: Bidirectional</div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs font-mono text-[#888]">Anomaly Probability</div>
                <div className={`text-2xl font-bold font-mono ${parseFloat(threatScore) > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {threatScore}%
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-mono text-xs font-bold ${
                isMalicious ? 'bg-rose-950/80 border border-rose-500 text-rose-200' : 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
              }`}>
                {isMalicious ? 'TRIGGER FIREWALL BLOCK' : 'TRAFFIC PERMITTED'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 4. Q&A CONVERSATIONAL CHATBOT (RAG)
  // ==========================================
  if (project.dashboardType === 'chatbot') {
    const sampleQueries = [
      'How does vector search prevent model hallucination?',
      'What is the maximum token chunk overlap in our ChromaDB pipeline?',
      'Explain the automated retry policy for failed inference calls.'
    ];

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-violet-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-violet-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Retrieval-Augmented Generation (RAG) Simulator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300 text-[11px] font-mono">
              ChromaDB + LangChain Pipeline
            </span>
          </div>

          <div className="mb-4">
            <label className="text-xs font-mono text-[#888] block mb-1.5">Preset Query Prompts</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setRagQuery(q);
                    trackSimulatorAction(project.id, 'chatbot', 'query_select', { query: q });
                  }}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-left ${
                    ragQuery === q 
                      ? 'bg-violet-950/60 border-violet-500/50 text-violet-200' 
                      : 'bg-[#111] border-[#222] text-[#888] hover:text-white'
                  }`}
                >
                  "{q}"
                </button>
              ))}
            </div>
            <input
              type="text"
              value={ragQuery}
              onChange={(e) => setRagQuery(e.target.value)}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:border-violet-400"
              placeholder="Enter custom question to test retrieval..."
            />
          </div>

          {/* RAG Inspection Pipeline Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-xs font-mono text-violet-300 font-bold mb-2 flex items-center justify-between">
                <span>1. ChromaDB Top-3 Retrieved Chunks</span>
                <span className="text-[10px] text-[#666]">Cosine Similarity</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#161616] border border-[#262626]">
                  <div className="flex justify-between text-[11px] text-cyan-400 mb-1">
                    <span>Source: doc_arch_v2.pdf (p.14)</span>
                    <span>Similarity: 94.2%</span>
                  </div>
                  <p className="text-[#aaa] text-[11px] leading-relaxed">
                    "...vector embeddings map user query semantic meaning into dense multi-dimensional space, retrieving exact verified paragraph excerpts before prompt injection..."
                  </p>
                </div>
                <div className="p-2.5 rounded bg-[#161616] border border-[#262626]">
                  <div className="flex justify-between text-[11px] text-cyan-400 mb-1">
                    <span>Source: guardrails_spec.md (p.3)</span>
                    <span>Similarity: 91.8%</span>
                  </div>
                  <p className="text-[#aaa] text-[11px] leading-relaxed">
                    "...hallucination guardrails compare generated tokens directly against retrieved context tokens, enforcing zero-tolerance on ungrounded claims..."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#111] border border-[#222] flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-emerald-300 font-bold mb-2 flex items-center justify-between">
                  <span>2. Grounded LLM Response</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px]">Guard: 0.00% Hallucination</span>
                </div>
                <p className="text-xs text-[#ddd] leading-relaxed bg-[#161616] p-3 rounded border border-[#262626]">
                  Vector search retrieves verified factual excerpts from internal documentation based on cosine similarity embeddings. The LLM is strictly constrained via system prompt instructions to only synthesize conclusions directly proven by the retrieved context chunks, citing page sources and rejecting answers outside the index.
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#222] flex items-center justify-between text-[11px] font-mono text-[#888]">
                <span>Inference Latency: <strong>680ms</strong></span>
                <span>Context Window: <strong>1,840 tokens</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 5. HARMFUL CONTENT MODERATION ENGINE
  // ==========================================
  if (project.dashboardType === 'moderation') {
    const textLower = modCommentText.toLowerCase();
    const isToxic = textLower.includes('stupid') || textLower.includes('idiot') || textLower.includes('fired') || textLower.includes('hate');
    const toxicScore = isToxic ? 88 : 12;
    const insultScore = isToxic ? 82 : 8;
    const severeScore = textLower.includes('die') || textLower.includes('kill') ? 92 : 4;
    const threatScore = textLower.includes('threat') || textLower.includes('kill') ? 85 : 3;

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-amber-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Multi-Label Content Moderation & Abuse Classifier
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
              RoBERTa Transformer Model
            </span>
          </div>

          <div className="mb-4">
            <label className="text-xs font-mono text-[#888] block mb-1.5">Interactive Comment Tester</label>
            <textarea
              rows={2}
              value={modCommentText}
              onChange={(e) => setModCommentText(e.target.value)}
              className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-xs font-mono text-white focus:border-amber-400"
              placeholder="Type or paste any text to test live toxicity classification..."
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888] flex justify-between">
                <span>Toxic Probability</span>
                <span className="text-amber-400 font-bold">{toxicScore}%</span>
              </div>
              <div className="w-full bg-[#222] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${toxicScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888] flex justify-between">
                <span>Insult Probability</span>
                <span className="text-orange-400 font-bold">{insultScore}%</span>
              </div>
              <div className="w-full bg-[#222] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-orange-400 h-full rounded-full transition-all" style={{ width: `${insultScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888] flex justify-between">
                <span>Severe Toxicity</span>
                <span className="text-rose-400 font-bold">{severeScore}%</span>
              </div>
              <div className="w-full bg-[#222] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full transition-all" style={{ width: `${severeScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-[11px] font-mono text-[#888] flex justify-between">
                <span>Violent Threat</span>
                <span className="text-red-500 font-bold">{threatScore}%</span>
              </div>
              <div className="w-full bg-[#222] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${threatScore}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#111] border border-[#222] flex items-center justify-between">
            <span className="text-xs font-mono text-[#888]">Automated Action Trigger:</span>
            <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
              toxicScore > 50 ? 'bg-rose-950/80 border border-rose-500 text-rose-300' : 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
            }`}>
              {toxicScore > 50 ? 'AUTO-FLAG & QUARANTINE COMMENT' : 'APPROVED FOR PUBLICATION'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 6. TEXT SUMMARIZATION
  // ==========================================
  if (project.dashboardType === 'summarize') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-blue-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Abstractive Transformer Text Summarization Simulator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[11px] font-mono">
              BART-large-CNN Architecture
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-mono text-[#888]">Summary Mode:</span>
            {(['Short', 'Medium', 'Bullets'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSumLengthTarget(mode)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  sumLengthTarget === mode ? 'bg-blue-600 text-white font-bold' : 'bg-[#141414] text-[#888]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#111] border border-[#222]">
              <div className="text-xs font-mono text-[#888] mb-2 flex justify-between">
                <span>Original Article (620 words)</span>
                <span>Reading Time: 3.5 min</span>
              </div>
              <p className="text-[11px] text-[#888] leading-relaxed line-clamp-6">
                Researchers and environmental planners across Southeast Asia have accelerated the deployment of earth-observation satellites to monitor fluctuating precipitation anomalies. Rapid urbanization combined with deforestation in catchment zones has amplified peak river runoff, overwhelming traditional levee networks. By integrating deep convolutional neural networks with high-frequency multispectral imagery, emergency agencies can now delineate flood boundaries within minutes rather than days, drastically reducing emergency response latency.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#111] border border-blue-500/30 bg-blue-950/10">
              <div className="text-xs font-mono text-blue-300 mb-2 flex justify-between font-bold">
                <span>Generated Abstractive Summary</span>
                <span>Reading Time: 30 sec</span>
              </div>
              <p className="text-xs text-[#eee] leading-relaxed">
                {sumLengthTarget === 'Bullets' ? (
                  <>
                    • Satellite imaging combined with deep learning cuts flood detection from days to minutes.<br />
                    • Urbanization and deforestation have amplified peak river runoff in catchment basins.<br />
                    • Automated boundary delineation enables proactive emergency disaster response.
                  </>
                ) : sumLengthTarget === 'Medium' ? (
                  "Southeast Asian environmental agencies are deploying satellite earth observation and deep convolutional neural networks to monitor rainfall anomalies and river runoff. This automated system maps flood boundaries in minutes rather than days, providing emergency responders with rapid geospatial intelligence to coordinate evacuations and protect vulnerable communities."
                ) : (
                  "Satellite imaging and deep learning models now detect and map flood extent in minutes instead of days, empowering emergency response teams to safeguard communities against severe monsoon runoff."
                )}
              </p>

              <div className="pt-3 mt-3 border-t border-[#222] flex justify-between text-[11px] font-mono text-blue-300">
                <span>ROUGE-1: <strong>44.8</strong></span>
                <span>ROUGE-L: <strong>41.2</strong></span>
                <span>Compression: <strong>76%</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 7. TOMATO CROP LEAF DISEASE CLASSIFICATION
  // ==========================================
  if (project.dashboardType === 'tomato') {
    const diseaseData: Record<string, { 
      pathogen: string; 
      confidence: number; 
      treatment: string; 
      severity: string;
      photoUrl: string;
      photoAlt: string;
      lesionsFound: number;
      symptoms: string;
      gradCamDesc: string;
      spreadRisk: string;
    }> = {
      'Early Blight': { 
        pathogen: 'Alternaria solani (Fungal Pathogen)', 
        confidence: 98.4, 
        treatment: 'Apply chlorothalonil or copper-based fungicide; remove infected lower leaflets; optimize drip fertigation.', 
        severity: 'High',
        photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a48?auto=format&fit=crop&w=1000&q=80',
        photoAlt: 'Tomato leaf exhibiting early blight concentric rings and chlorosis',
        lesionsFound: 5,
        symptoms: 'Distinct concentric necrotic brown bullseye rings surrounded by yellow chlorotic halo.',
        gradCamDesc: 'Deep feature activations clustered over circular necrotic centers and foliar margins.',
        spreadRisk: 'Rapid in 24°C-29°C with intermittent rainfall'
      },
      'Late Blight': { 
        pathogen: 'Phytophthora infestans (Oomycete)', 
        confidence: 97.9, 
        treatment: 'Immediate foliar application of Chlorothalonil or Cymoxanil; avoid overhead sprinkler watering.', 
        severity: 'Critical',
        photoUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=1000&q=80',
        photoAlt: 'Tomato leaf exhibiting water-soaked dark brown late blight lesions',
        lesionsFound: 7,
        symptoms: 'Irregular dark water-soaked lesions turning brown-black with pale gray downy sporulation beneath.',
        gradCamDesc: 'High gradient intensity localized on water-soaked lesion borders and petiole attachment.',
        spreadRisk: 'Catastrophic spread under cool, wet conditions (>90% RH)'
      },
      'Yellow Leaf Curl Virus': { 
        pathogen: 'Begomovirus (Whitefly-transmitted TYLCV)', 
        confidence: 99.1, 
        treatment: 'Deploy yellow sticky traps for Bemisia tabaci vector control; rogue out severely stunted plants immediately.', 
        severity: 'Severe',
        photoUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1000&q=80',
        photoAlt: 'Tomato leaves with severe upward curling, chlorosis and stunting',
        lesionsFound: 3,
        symptoms: 'Marked upward curling and cupping of leaflet margins with severe interveinal chlorosis and stunted leaf size.',
        gradCamDesc: 'Neural weights heavily attended to curled outer margins and leaf venation.',
        spreadRisk: 'Systemic vector-driven transmission via whiteflies'
      },
      'Leaf Mold': { 
        pathogen: 'Passalora fulva / Cladosporium (Fungus)', 
        confidence: 96.5, 
        treatment: 'Increase greenhouse ventilation to reduce relative humidity below 85%; apply copper or mancozeb fungicide.', 
        severity: 'Moderate',
        photoUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
        photoAlt: 'Tomato foliage displaying chlorotic patches and leaf mold',
        lesionsFound: 4,
        symptoms: 'Pale greenish-yellow chlorotic blotches on upper leaf surface with olive-brown velvety mold on undersides.',
        gradCamDesc: 'Activated primarily on diffuse chlorotic boundaries on upper foliar lamina.',
        spreadRisk: 'Confined largely to high-humidity polytunnels and greenhouses'
      },
      'Healthy': { 
        pathogen: 'Lycopersicon esculentum (Pristine Plant Health)', 
        confidence: 99.5, 
        treatment: 'Zero chemical spray needed. Continue balanced N-P-K fertigation and weekly scouting protocol.', 
        severity: 'Optimal',
        photoUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
        photoAlt: 'Healthy green tomato compound leaf foliage',
        lesionsFound: 0,
        symptoms: 'Vibrant uniform dark green foliage, crisp intact margins, zero fungal spots or viral chlorosis.',
        gradCamDesc: 'Uniform low baseline activation across leaf surface with zero localized lesion anomalies.',
        spreadRisk: 'None (Immune vigorous canopy)'
      },
    };

    const current = diseaseData[tomatoSelectedDisease];

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-emerald-500/20 shadow-xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Tomato Crop Foliar Disease Pathology Classifier
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                ResNet-50 + Grad-CAM Vision
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-[#888]">
                PlantVillage 18.1K Dataset
              </span>
            </div>
          </div>

          {/* Disease Selector Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(diseaseData) as (keyof typeof diseaseData)[]).map((dis) => (
              <button
                key={dis}
                type="button"
                onClick={() => {
                  setTomatoSelectedDisease(dis as any);
                  trackSimulatorAction(project.id, 'tomato', 'disease_select', { disease: dis });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  tomatoSelectedDisease === dis
                    ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-950/50'
                    : 'bg-[#141414] text-[#888] hover:text-white hover:bg-[#202020] border border-[#222]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dis === 'Healthy' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span>{dis}</span>
              </button>
            ))}
          </div>

          {/* Interactive Specimen Photo & Neural Vision Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Left: Specimen Photo Viewport with Neural Overlay */}
            <div className="lg:col-span-7 bg-[#0d1219] rounded-xl border border-emerald-500/30 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ffffff10]">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Field Camera Specimen: {tomatoSelectedDisease}
                  </span>
                </div>

                {/* View Mode Switcher: Raw Photo vs Grad-CAM Heatmap */}
                <div className="flex items-center bg-[#070a0f] p-0.5 rounded-lg border border-emerald-500/25 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setTomatoViewMode('specimen')}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      tomatoViewMode === 'specimen'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                        : 'text-[#888] hover:text-white'
                    }`}
                  >
                    📷 Raw Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTomatoViewMode('gradcam')}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      tomatoViewMode === 'gradcam'
                        ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                        : 'text-[#888] hover:text-white'
                    }`}
                  >
                    🔥 Grad-CAM Heatmap
                  </button>
                </div>
              </div>

              {/* Photo Display Viewport */}
              <div className="relative aspect-video sm:aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-[#ffffff0a] group">
                <img
                  src={current.photoUrl}
                  alt={current.photoAlt}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a48?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Grad-CAM Neural Heatmap Gradient Simulation Overlay */}
                {tomatoViewMode === 'gradcam' && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-85 transition-opacity">
                    {tomatoSelectedDisease === 'Early Blight' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_45%_55%,rgba(239,68,68,0.85)_0%,rgba(245,158,11,0.6)_35%,rgba(59,130,246,0.2)_70%,transparent_100%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Late Blight' && (
                      <div className="w-full h-full bg-[radial-gradient(circle_at_60%_40%,rgba(225,29,72,0.9)_0%,rgba(217,119,6,0.65)_30%,rgba(37,99,235,0.25)_65%,transparent_100%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Yellow Leaf Curl Virus' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(234,179,8,0.85)_0%,rgba(249,115,22,0.6)_40%,transparent_80%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Leaf Mold' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_35%_65%,rgba(168,85,247,0.75)_0%,rgba(245,158,11,0.5)_40%,transparent_80%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Healthy' && (
                      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3)_0%,transparent_70%)]" />
                    )}
                  </div>
                )}

                {/* Simulated Neural Bounding Box Annotations */}
                {tomatoViewMode === 'gradcam' && tomatoSelectedDisease !== 'Healthy' && (
                  <div className="absolute top-[32%] left-[30%] w-[38%] h-[42%] border-2 border-dashed border-rose-400/90 rounded bg-rose-500/10 pointer-events-none flex flex-col justify-between p-1 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    <span className="text-[9px] font-mono font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded self-start shadow-sm">
                      {tomatoSelectedDisease} ({current.confidence}%)
                    </span>
                    <span className="text-[8px] font-mono text-rose-200 bg-black/80 px-1 rounded self-end">
                      Layer49 Grad: 0.942
                    </span>
                  </div>
                )}

                {/* Status Badges on Photo */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-[9px] font-mono text-white">
                    SPECIMEN ID: TM-{tomatoSelectedDisease.substring(0, 3).toUpperCase()}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    current.severity === 'Critical' 
                      ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50' 
                      : current.severity === 'Severe' || current.severity === 'High'
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
                      : current.severity === 'Optimal'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                      : 'bg-blue-950/90 text-blue-300 border border-blue-500/50'
                  }`}>
                    {current.severity} Urgency
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono text-[#ccc]">
                    Resolution: 224x224 RGB • ResNet-50
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                    42ms Inference
                  </span>
                </div>
              </div>

              {/* Foliar Symptom Profile Caption */}
              <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-[#070a0f] border border-[#ffffff08] text-[11px] font-mono text-[#aaa]">
                <strong className="text-white">Foliar Symptoms:</strong> {current.symptoms}
              </div>
            </div>

            {/* Right: Pathological Diagnostics & Action Plan */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Diagnostic Confidence Card */}
              <div className="p-3.5 rounded-xl bg-[#111620] border border-[#ffffff10] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#777] uppercase">Diagnostic Confidence</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-300 mt-0.5">
                    {current.confidence}%
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                    Top-1 Softmax Output
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#777] uppercase">Lesions Detected</div>
                  <div className="text-2xl font-bold font-mono text-white mt-0.5">
                    {current.lesionsFound}
                  </div>
                  <div className="text-[10px] text-[#888]">
                    Foliar lamina spots
                  </div>
                </div>
              </div>

              {/* Pathogen Detail Card */}
              <div className="p-3.5 rounded-xl bg-[#10141d] border border-[#ffffff0a]">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Diagnosed Botanical Pathogen
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {tomatoSelectedDisease}
                </div>
                <div className="text-xs text-emerald-300 italic font-mono mt-0.5">
                  {current.pathogen}
                </div>
                <div className="text-[11px] text-[#888] font-mono mt-2 pt-2 border-t border-[#ffffff08]">
                  <strong>Epidemiological Risk:</strong> {current.spreadRisk}
                </div>
              </div>

              {/* Agronomic Treatment Recommendation */}
              <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 mb-1.5">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Recommended Agronomic Action</span>
                  </div>
                  <p className="text-xs text-[#d1d5db] leading-relaxed">
                    {current.treatment}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span>Agronomic Yield Saved: ~25%</span>
                  <span>Turnaround: Instant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#111] border border-[#222]">
            <div>
              <div className="text-[10px] font-mono text-[#888]">Architecture</div>
              <div className="text-xs font-bold font-mono text-white mt-0.5">ResNet-50 + Head</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#888]">Validation F1</div>
              <div className="text-xs font-bold font-mono text-emerald-400 mt-0.5">97.5% Macro F1</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#888]">Edge Deployment</div>
              <div className="text-xs font-bold font-mono text-cyan-400 mt-0.5">TensorFlow Lite (TFLite)</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#888]">Agricultural Domain</div>
              <div className="text-xs font-bold font-mono text-violet-400 mt-0.5">B.Sc. Agriculture Aligned</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 8. HOSPITALITY REVENUE & REVPAR ANALYSIS
  // ==========================================
  if (project.dashboardType === 'hospitality') {
    const totalRooms = 150;
    const occupiedRooms = Math.round(totalRooms * (hospOccupancyPct / 100));
    const dailyGrossRev = occupiedRooms * hospAdr;
    const revPar = Math.round(dailyGrossRev / totalRooms);
    const otaShare = 100 - hospDirectBookingPct;
    const otaCommissionPaid = Math.round(dailyGrossRev * (otaShare / 100) * 0.18); // 18% OTA commission

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-yellow-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Hotel className="w-5 h-5 text-yellow-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Hospitality Revenue & RevPAR Intelligence Simulator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-yellow-950/60 border border-yellow-500/30 text-yellow-300 text-[11px] font-mono">
              Power BI DAX Star-Schema Model
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>Average Daily Rate (ADR)</span>
                <span className="text-yellow-300 font-bold">₹{hospAdr.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="18000"
                step="500"
                value={hospAdr}
                onChange={(e) => setHospAdr(parseInt(e.target.value, 10))}
                className="w-full accent-yellow-400"
              />
            </div>

            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>Occupancy Rate</span>
                <span className="text-yellow-300 font-bold">{hospOccupancyPct}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="98"
                value={hospOccupancyPct}
                onChange={(e) => setHospOccupancyPct(parseInt(e.target.value, 10))}
                className="w-full accent-yellow-400"
              />
            </div>

            <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1">
                <span>Direct Booking Mix</span>
                <span className="text-yellow-300 font-bold">{hospDirectBookingPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={hospDirectBookingPct}
                onChange={(e) => setHospDirectBookingPct(parseInt(e.target.value, 10))}
                className="w-full accent-yellow-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111] border border-[#222]">
            <div>
              <div className="text-[11px] font-mono text-[#888]">RevPAR (Rev Per Avail Room)</div>
              <div className="text-2xl font-bold font-mono text-yellow-300 mt-1">₹{revPar.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-[#555]">Industry benchmark</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Daily Realized Revenue</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">₹{dailyGrossRev.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-[#555]">{occupiedRooms} of 150 rooms filled</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">OTA Commission Leakage</div>
              <div className="text-2xl font-bold font-mono text-rose-400 mt-1">₹{otaCommissionPaid.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-[#555]">18% on third-party bookings</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Optimization Strategy</div>
              <div className="text-xs font-mono font-bold text-emerald-300 mt-1">
                {hospOccupancyPct > 80 ? 'Hike ADR +15% on Weekends' : 'Boost Direct Loyalty Promo'}
              </div>
              <div className="text-[10px] text-[#555]">Yield Management</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 9. DIWALI FESTIVE SALES CONSUMER BEHAVIOR
  // ==========================================
  if (project.dashboardType === 'diwali') {
    const isFemale = diwaliGender === 'Female';
    const baseBasket = isFemale ? 11200 : 7800;
    const ageMultiplier = diwaliAgeGroup === '26-35' ? 1.35 : diwaliAgeGroup === '36-45' ? 1.15 : 0.85;
    const occMultiplier = diwaliOccupation === 'IT' ? 1.25 : diwaliOccupation === 'Healthcare' ? 1.20 : diwaliOccupation === 'Aviation' ? 1.30 : 1.0;
    const estimatedSpend = Math.round(baseBasket * ageMultiplier * occMultiplier);
    const topCategory = isFemale ? 'Apparel & Traditional Food' : 'Electronics & Gadgets';

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-orange-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Diwali Festive Sales Customer Behavior & Market Basket EDA
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 text-[11px] font-mono">
              Retail Demographic Segmentation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Shopper Gender</label>
              <div className="flex gap-1.5">
                {(['Female', 'Male'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setDiwaliGender(g)}
                    className={`flex-1 py-1.5 text-xs font-mono font-bold rounded cursor-pointer ${
                      diwaliGender === g ? 'bg-orange-500 text-white' : 'bg-[#181818] text-[#888]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Age Bracket</label>
              <select
                value={diwaliAgeGroup}
                onChange={(e) => setDiwaliAgeGroup(e.target.value as any)}
                className="w-full bg-[#111] border border-[#222] rounded px-3 py-1.5 text-xs font-mono text-white focus:border-orange-500"
              >
                <option value="18-25">18-25 (Young Adults)</option>
                <option value="26-35">26-35 (Key Persona)</option>
                <option value="36-45">36-45 (Established Families)</option>
                <option value="46+">46+ (Senior Homemakers)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Occupation</label>
              <select
                value={diwaliOccupation}
                onChange={(e) => setDiwaliOccupation(e.target.value as any)}
                className="w-full bg-[#111] border border-[#222] rounded px-3 py-1.5 text-xs font-mono text-white focus:border-orange-500"
              >
                <option value="IT">IT Professional</option>
                <option value="Healthcare">Healthcare Worker</option>
                <option value="Aviation">Aviation Crew</option>
                <option value="Banking">Banking & Finance</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-[#888] block mb-1">Regional State Hub</label>
              <div className="text-xs font-mono text-orange-300 font-bold py-1.5">
                Maharashtra & UP (42% GMV)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#111] border border-[#222]">
            <div>
              <div className="text-[11px] font-mono text-[#888]">Projected Basket Value</div>
              <div className="text-2xl font-bold font-mono text-orange-300 mt-1">₹{estimatedSpend.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-[#555]">Peak festive cart size</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Highest Affinity Category</div>
              <div className="text-base font-bold font-mono text-white mt-1">{topCategory}</div>
              <div className="text-[10px] text-[#555]">Driven by festive gifting</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#888]">Merchandising Recommendation</div>
              <div className="text-xs font-mono font-bold text-emerald-300 mt-1">
                Stockpile {topCategory} in northern & western hubs 3 weeks prior
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
