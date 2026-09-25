import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, AreaChart, Area, Cell 
} from 'recharts';
import { 
  Waves, AlertTriangle, ShieldCheck, Cpu, MessageSquare, 
  FileText, Leaf, Hotel, ShoppingBag, Sparkles, Filter, Play, 
  RefreshCw, CheckCircle2, ChevronRight, Activity, ArrowUpRight, Zap,
  Camera, Scan, Eye, ZoomIn, Code2, ExternalLink,
  Upload, Image as ImageIcon, Info, HelpCircle, X, Check, Layers
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
  const [tomatoSelectedDisease, setTomatoSelectedDisease] = useState<'Healthy' | 'Early Blight' | 'Late Blight' | 'Septoria Spot' | 'Yellow Leaf Curl' | 'Bacterial Spot'>('Healthy');
  const [tomatoConfidenceFloor, setTomatoConfidenceFloor] = useState(85);
  const [tomatoViewMode, setTomatoViewMode] = useState<'specimen' | 'gradcam'>('specimen');
  const [tomatoInspectionZoom, setTomatoInspectionZoom] = useState(false);
  const [tomatoCustomImage, setTomatoCustomImage] = useState<string | null>(null);
  const [tomatoCustomFileName, setTomatoCustomFileName] = useState<string | null>(null);
  const [tomatoShowGuide, setTomatoShowGuide] = useState(false);
  const [tomatoImageErrors, setTomatoImageErrors] = useState<Record<string, boolean>>({});

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
  // ==========================================
  // 7. TOMATO CROP LEAF DISEASE CLASSIFICATION
  // ==========================================
  if (project.dashboardType === 'tomato') {
    const diseaseData: Record<'Healthy' | 'Early Blight' | 'Late Blight' | 'Septoria Spot' | 'Yellow Leaf Curl' | 'Bacterial Spot', { 
      pathogen: string; 
      confidence: number; 
      treatment: string; 
      severity: string;
      primaryPhoto: string;
      localPhoto: string;
      photoAlt: string;
      lesionsFound: number;
      symptoms: string;
      gradCamDesc: string;
      spreadRisk: string;
      badgeIcon: string;
      color: 'emerald' | 'amber' | 'rose' | 'yellow' | 'purple' | 'cyan';
      boxStyle: { top: string; left: string; width: string; height: string };
    }> = {
      'Healthy': { 
        pathogen: 'Healthy Plant Foliage (Zero Pathogen Detected)', 
        confidence: 99.4, 
        treatment: 'Optimal leaf condition. Continue preventive scouting, balanced nutrition (N-P-K), and drip irrigation. No fungicide intervention necessary.', 
        severity: 'Optimal',
        primaryPhoto: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a48?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/healthy.jpg',
        photoAlt: 'Healthy tomato crop foliage showing clean green leaves with no viral or fungal signs',
        lesionsFound: 0,
        symptoms: 'Lamina exhibits zero viral or fungal symptoms. Vibrant chlorophyll pigmentation, uniform venation, and turgid cellular morphology.',
        gradCamDesc: 'Uniform basal activation across entire chlorophyll lamina without focal necrotic clustering.',
        spreadRisk: 'None — Normal healthy plant physiology',
        badgeIcon: '🟢',
        color: 'emerald',
        boxStyle: { top: '20%', left: '20%', width: '60%', height: '60%' }
      },
      'Early Blight': { 
        pathogen: 'Alternaria solani (Fungal Foliar Pathogen)', 
        confidence: 98.4, 
        treatment: 'Apply protective copper fungicide or chlorothalonil; prune and destroy infected lower foliage; avoid overhead irrigation.', 
        severity: 'High',
        primaryPhoto: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/early_blight.jpg',
        photoAlt: 'Verified tomato leaf exhibiting early blight concentric target rings and chlorosis',
        lesionsFound: 5,
        symptoms: 'Brown-to-black necrotic lesions displaying characteristic concentric annular rings (target board pattern) with chlorotic halo.',
        gradCamDesc: 'Deep convolutional filters concentrated over circular necrotic target rings and surrounding chlorotic halos.',
        spreadRisk: 'Rapid in warm, humid weather (24°C–29°C) with persistent leaf wetness or rainfall.',
        badgeIcon: '🟠',
        color: 'amber',
        boxStyle: { top: '32%', left: '30%', width: '40%', height: '42%' }
      },
      'Late Blight': { 
        pathogen: 'Phytophthora infestans (Oomycete Water Mold)', 
        confidence: 97.9, 
        treatment: 'Emergency systemic fungicide application (Cymoxanil, Dimethomorph, or Metalaxyl); rogue out infected vines; stop overhead irrigation.', 
        severity: 'Critical',
        primaryPhoto: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/late_blight.jpg',
        photoAlt: 'Tomato leaf exhibiting water-soaked dark brown late blight lesions and necrotic blighting',
        lesionsFound: 7,
        symptoms: 'Large, irregular water-soaked pale green lesions rapidly expanding into dark purplish-black blotches with white downy sporangia on undersides.',
        gradCamDesc: 'Intense neural gradient localization mapping water-soaked lesion borders and petiole attachment points.',
        spreadRisk: 'Devastating epidemic risk under cool, high-humidity wet foliage conditions (>90% RH, 15°C–20°C).',
        badgeIcon: '🔴',
        color: 'rose',
        boxStyle: { top: '26%', left: '24%', width: '52%', height: '50%' }
      },
      'Septoria Spot': { 
        pathogen: 'Septoria lycopersici (Foliar Ascomycete)', 
        confidence: 96.7, 
        treatment: 'Spray protective Mancozeb or Copper Hydroxide; mulch soil surface to eliminate fungal splash-up from soil onto lower leaflets.', 
        severity: 'Moderate',
        primaryPhoto: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/septoria_spot.jpg',
        photoAlt: 'Tomato leaf showing circular Septoria spots with dark margins and gray centers',
        lesionsFound: 14,
        symptoms: 'Numerous small circular spots (1–3mm) with dark brown borders and sunken tan or ash-gray centers studded with tiny black pycnidia.',
        gradCamDesc: 'Multi-focal neural activations pinpointing clustered circular micro-spots across leaflet periphery.',
        spreadRisk: 'Spreads rapidly during extended wet periods (20°C–25°C) via rain splash and mechanical handling.',
        badgeIcon: '🟡',
        color: 'yellow',
        boxStyle: { top: '22%', left: '26%', width: '48%', height: '48%' }
      },
      'Yellow Leaf Curl': { 
        pathogen: 'Tomato Yellow Leaf Curl Virus (TYLCV - Begomovirus)', 
        confidence: 98.1, 
        treatment: 'Vector control: spray neem oil or systemic imidacloprid to suppress Bemisia tabaci whiteflies; install yellow sticky traps.', 
        severity: 'High',
        primaryPhoto: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/yellow_leaf_curl.jpg',
        photoAlt: 'Tomato leaf exhibiting upward curling and marginal interveinal chlorosis',
        lesionsFound: 0,
        symptoms: 'Pronounced upward curling and cupping of leaflets, marginal chlorosis, interveinal yellowing, stunted growth, and bushy apical shoot.',
        gradCamDesc: 'Convolutional feature maps highlighting distorted leaflet curlings and chlorotic peripheral margins.',
        spreadRisk: 'Transmitted persistently by Bemisia tabaci whitefly vectors across greenhouse and field rows.',
        badgeIcon: '🟣',
        color: 'purple',
        boxStyle: { top: '18%', left: '18%', width: '64%', height: '64%' }
      },
      'Bacterial Spot': { 
        pathogen: 'Xanthomonas perforans / Xanthomonas vesicatoria', 
        confidence: 95.8, 
        treatment: 'Apply fixed copper bactericide tank-mixed with Mancozeb; use certified disease-free seeds; avoid handling plants when foliage is wet.', 
        severity: 'High',
        primaryPhoto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
        localPhoto: '/images/tomato/bacterial_spot.jpg',
        photoAlt: 'Tomato leaf displaying angular water-soaked dark bacterial lesions',
        lesionsFound: 9,
        symptoms: 'Small, circular to angular water-soaked dark brown spots often surrounded by a distinctive greasy chlorotic halo that coalesce into tears.',
        gradCamDesc: 'High gradient sensitivity over angular lesion borders and petiole vascular junctions.',
        spreadRisk: 'Favored by warm temperatures (>28°C) and driven by rain splash or overhead sprinklers.',
        badgeIcon: '🟤',
        color: 'cyan',
        boxStyle: { top: '30%', left: '28%', width: '44%', height: '44%' }
      }
    };

    const current = diseaseData[tomatoSelectedDisease];

    // Determine active image URL with robust multi-tier fallback
    const hasLocalError = !!tomatoImageErrors[tomatoSelectedDisease];
    const displayImageUrl = tomatoCustomImage 
      ? tomatoCustomImage 
      : (hasLocalError ? current.primaryPhoto : current.localPhoto);

    const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setTomatoCustomFileName(file.name);
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const result = uploadEvent.target?.result as string;
          setTomatoCustomImage(result);
          trackSimulatorAction(project.id, 'tomato', 'custom_photo_upload', { fileName: file.name });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-emerald-500/20 shadow-xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Crop Foliar Pathology Diagnostic Engine
                </h3>
                <p className="text-[11px] font-mono text-slate-500 dark:text-[#888]">
                  ResNet-50 Deep Computer Vision • 6 Verified Plant Pathology Classes
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Photo Guide / Help Button */}
              <button
                type="button"
                onClick={() => setTomatoShowGuide(!tomatoShowGuide)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#222] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-[#bbb] hover:text-slate-950 dark:hover:text-white text-[11px] font-mono font-medium inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="View photo verification status & manual instructions"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Photo Guide & Verification</span>
              </button>

              {/* Upload Field Photo Button */}
              <label className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-200 text-[11px] font-mono font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer group">
                <Upload className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Upload Field Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomFileUpload}
                  className="hidden"
                />
              </label>

              <a
                href={project.liveDemoUrl || "https://potato-disease-prediction-ambigapathikavin.streamlit.app/"}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-[11px] font-mono font-bold inline-flex items-center gap-1.5 transition-all shadow-sm group/live"
                title="Launch deployed Streamlit application"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                <span>Live Streamlit App</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover/live:opacity-100" />
              </a>

              <a
                href={project.githubUrl || "https://github.com/ambigapathikavin/Potato_Disease_Prediction/tree/main"}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 dark:hover:bg-[#202020] border border-slate-200 dark:border-[#ffffff15] text-slate-700 dark:text-[#ccc] text-[11px] font-mono font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm group/git"
                title="Explore source code repository on GitHub"
              >
                <Code2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>GitHub Code</span>
              </a>
            </div>
          </div>

          {/* Verification & Manual Setup Guide Accordion */}
          {tomatoShowGuide && (
            <div className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-[#0c1017] border border-cyan-500/30 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-[#ffffff10]">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-bold">
                  <Info className="w-4 h-4" />
                  <span>Crop Foliar Images: Verification & Setup Guide</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTomatoShowGuide(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Explanation */}
                <div className="space-y-2 text-slate-600 dark:text-[#aaa]">
                  <p className="font-bold text-slate-900 dark:text-white">
                    🔍 Why images might not show on another computer or deployment:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>
                      <strong className="text-slate-800 dark:text-[#ddd]">Git Tracking:</strong> When cloning or deploying to GitHub Pages / Vercel, the local folder <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-black text-cyan-600 dark:text-cyan-300">public/images/tomato/</code> must be tracked. If it wasn't committed, other systems won't have local image files.
                    </li>
                    <li>
                      <strong className="text-slate-800 dark:text-[#ddd]">Base URL Subpaths:</strong> When hosted on subpaths (e.g. <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-black text-cyan-600 dark:text-cyan-300">username.github.io/repo/</code>), absolute paths starting with <code className="text-amber-500">/images/</code> can fail without a relative base.
                    </li>
                    <li>
                      <strong className="text-emerald-700 dark:text-emerald-400">Automatic Fix Enabled:</strong> We've now built in a multi-tier fallback: if a local photo cannot be found on any computer, the app seamlessly serves a high-resolution agricultural CDN photo or botanical SVG illustration!
                    </li>
                  </ul>
                </div>

                {/* Manual Steps */}
                <div className="space-y-2 text-slate-600 dark:text-[#aaa]">
                  <p className="font-bold text-slate-900 dark:text-white">
                    🛠️ What you can do manually in your project folder:
                  </p>
                  <div className="p-2.5 rounded bg-slate-200 dark:bg-[#07090e] border border-slate-300 dark:border-[#ffffff10] text-[11px] space-y-1.5">
                    <p className="text-slate-800 dark:text-white font-semibold">1. Ensure the following files exist in <span className="text-cyan-600 dark:text-cyan-300">public/images/tomato/</span>:</p>
                    <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-700 dark:text-[#999]">
                      <span>✓ healthy.jpg</span>
                      <span>✓ early_blight.jpg</span>
                      <span>✓ late_blight.jpg</span>
                      <span>✓ septoria_spot.jpg</span>
                      <span>✓ yellow_leaf_curl.jpg</span>
                      <span>✓ bacterial_spot.jpg</span>
                    </div>
                    <p className="text-slate-800 dark:text-white font-semibold pt-1">2. Run in your terminal before pushing to GitHub:</p>
                    <code className="block p-1.5 rounded bg-slate-900 text-emerald-400 text-[10px]">
                      git add public/images/tomato/<br/>
                      git commit -m "Add foliar disease images"<br/>
                      git push
                    </code>
                    <p className="text-slate-800 dark:text-white font-semibold pt-1">3. Or upload any photo directly on this page to test right now!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Upload Banner (if active) */}
          {tomatoCustomImage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-mono text-emerald-900 dark:text-emerald-200">
                  Custom Field Photo Active: <strong className="underline">{tomatoCustomFileName || 'Uploaded Image'}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTomatoCustomImage(null);
                  setTomatoCustomFileName(null);
                }}
                className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 hover:bg-emerald-300 dark:hover:bg-emerald-700 text-emerald-900 dark:text-emerald-100 text-[10px] font-mono font-bold cursor-pointer"
              >
                Reset to Benchmark Specimen
              </button>
            </div>
          )}

          {/* Diagnostic Classes Selector Tabs */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-500 dark:text-[#888] uppercase tracking-wider">
                Select Diagnostic Specimen Class:
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                {Object.keys(diseaseData).length} Verified Pathologies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {(Object.keys(diseaseData) as (keyof typeof diseaseData)[]).map((dis) => {
                const item = diseaseData[dis];
                const isSelected = tomatoSelectedDisease === dis;
                return (
                  <button
                    key={dis}
                    type="button"
                    onClick={() => {
                      setTomatoSelectedDisease(dis);
                      trackSimulatorAction(project.id, 'tomato', 'disease_select', { disease: dis });
                    }}
                    className={`p-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex flex-col justify-between border text-left ${
                      isSelected
                        ? dis === 'Healthy'
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-950/30'
                          : dis === 'Early Blight'
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-950/30'
                          : dis === 'Late Blight'
                          ? 'bg-rose-500 text-white font-bold border-rose-400 shadow-md shadow-rose-950/30'
                          : dis === 'Septoria Spot'
                          ? 'bg-yellow-400 text-slate-950 font-bold border-yellow-300 shadow-md'
                          : dis === 'Yellow Leaf Curl'
                          ? 'bg-purple-600 text-white font-bold border-purple-400 shadow-md'
                          : 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md'
                        : 'bg-slate-50 dark:bg-[#12161f] text-slate-700 dark:text-[#aaa] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1a202c] border-slate-200 dark:border-[#202736]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{item.badgeIcon}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        isSelected 
                          ? 'bg-black/20 text-current' 
                          : 'bg-slate-200 dark:bg-[#1e2533] text-slate-600 dark:text-[#888]'
                      }`}>
                        {item.confidence}%
                      </span>
                    </div>
                    <div className="font-bold text-[11px] leading-tight truncate w-full">
                      {dis}
                    </div>
                    <div className={`text-[9px] mt-0.5 ${isSelected ? 'opacity-90' : 'text-slate-500 dark:text-[#777]'}`}>
                      {item.severity}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Specimen Photo & Neural Vision Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Left: Specimen Photo Viewport with Neural Overlay */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-[#0d1219] rounded-xl border border-slate-200 dark:border-emerald-500/30 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-[#ffffff10]">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                    Field Specimen: {current.badgeIcon} {tomatoCustomImage ? 'Custom Capture' : tomatoSelectedDisease}
                  </span>
                </div>

                {/* View Mode Switcher: Raw Photo vs Grad-CAM Heatmap */}
                <div className="flex items-center bg-white dark:bg-[#070a0f] p-0.5 rounded-lg border border-slate-200 dark:border-emerald-500/25 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setTomatoViewMode('specimen')}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      tomatoViewMode === 'specimen'
                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/40'
                        : 'text-slate-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    📷 Raw Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTomatoViewMode('gradcam')}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      tomatoViewMode === 'gradcam'
                        ? 'bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold border border-rose-500/40'
                        : 'text-slate-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🔥 Grad-CAM Heatmap
                  </button>
                </div>
              </div>

              {/* Photo Display Viewport with Multi-Tier Fallback */}
              <div className="relative aspect-video sm:aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-[#ffffff0a] group">
                <img
                  src={displayImageUrl}
                  alt={current.photoAlt}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    // Mark this disease as having a local error so it switches immediately to CDN
                    setTomatoImageErrors(prev => ({ ...prev, [tomatoSelectedDisease]: true }));
                  }}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Grad-CAM Neural Heatmap Gradient Simulation Overlay */}
                {tomatoViewMode === 'gradcam' && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-85 transition-opacity">
                    {tomatoSelectedDisease === 'Healthy' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.5)_0%,rgba(34,197,94,0.3)_40%,transparent_80%)]" />
                    )}
                    {tomatoSelectedDisease === 'Early Blight' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_45%_55%,rgba(239,68,68,0.85)_0%,rgba(245,158,11,0.65)_35%,rgba(59,130,246,0.2)_70%,transparent_100%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Late Blight' && (
                      <div className="w-full h-full bg-[radial-gradient(circle_at_60%_40%,rgba(225,29,72,0.9)_0%,rgba(217,119,6,0.65)_30%,rgba(37,99,235,0.25)_65%,transparent_100%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Septoria Spot' && (
                      <div className="w-full h-full bg-[radial-gradient(circle_at_35%_50%,rgba(234,179,8,0.85)_0%,rgba(249,115,22,0.6)_35%,transparent_75%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Yellow Leaf Curl' && (
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(168,85,247,0.85)_0%,rgba(234,179,8,0.6)_40%,transparent_80%)] animate-pulse" />
                    )}
                    {tomatoSelectedDisease === 'Bacterial Spot' && (
                      <div className="w-full h-full bg-[radial-gradient(circle_at_40%_60%,rgba(6,182,212,0.85)_0%,rgba(239,68,68,0.6)_35%,transparent_75%)] animate-pulse" />
                    )}
                  </div>
                )}

                {/* Simulated Neural Bounding Box Annotations */}
                {tomatoViewMode === 'gradcam' && (
                  <div 
                    style={current.boxStyle}
                    className={`absolute pointer-events-none flex flex-col justify-between p-1.5 border-2 border-dashed rounded shadow-lg ${
                      tomatoSelectedDisease === 'Healthy'
                        ? 'border-emerald-400/90 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : tomatoSelectedDisease === 'Early Blight'
                        ? 'border-amber-400/90 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : tomatoSelectedDisease === 'Late Blight'
                        ? 'border-rose-400/90 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                        : tomatoSelectedDisease === 'Septoria Spot'
                        ? 'border-yellow-400/90 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                        : tomatoSelectedDisease === 'Yellow Leaf Curl'
                        ? 'border-purple-400/90 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                        : 'border-cyan-400/90 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded self-start shadow-sm text-white ${
                      tomatoSelectedDisease === 'Healthy'
                        ? 'bg-emerald-600'
                        : tomatoSelectedDisease === 'Early Blight'
                        ? 'bg-amber-600'
                        : tomatoSelectedDisease === 'Late Blight'
                        ? 'bg-rose-600'
                        : tomatoSelectedDisease === 'Septoria Spot'
                        ? 'bg-yellow-600'
                        : tomatoSelectedDisease === 'Yellow Leaf Curl'
                        ? 'bg-purple-600'
                        : 'bg-cyan-600'
                    }`}>
                      {tomatoSelectedDisease} ({current.confidence}%)
                    </span>
                    <span className="text-[8px] font-mono text-white/90 bg-black/80 px-1 rounded self-end">
                      ResNet-50 Layer49 Peak
                    </span>
                  </div>
                )}

                {/* Status Badges on Photo */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-[9px] font-mono text-white">
                    SPECIMEN: {tomatoSelectedDisease.toUpperCase()}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    current.severity === 'Critical' 
                      ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50' 
                      : current.severity === 'High'
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
                      : current.severity === 'Moderate'
                      ? 'bg-yellow-950/90 text-yellow-300 border border-yellow-500/50'
                      : 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                  }`}>
                    {current.severity === 'Optimal' ? 'Healthy Foliage' : `${current.severity} Urgency`}
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
              <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#070a0f] border border-slate-200 dark:border-[#ffffff08] text-[11px] font-mono text-slate-700 dark:text-[#aaa]">
                <strong className="text-slate-900 dark:text-white">Foliar Symptoms:</strong> {current.symptoms}
              </div>
            </div>

            {/* Right: Pathological Diagnostics & Action Plan */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Diagnostic Confidence Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111620] border border-slate-200 dark:border-[#ffffff10] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-[#777] uppercase">Diagnostic Confidence</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-300 mt-0.5">
                    {current.confidence}%
                  </div>
                  <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                    Top-1 Softmax Output
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-[#777] uppercase">Lesions Detected</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                    {current.lesionsFound}
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-[#888]">
                    Foliar lamina spots
                  </div>
                </div>
              </div>

              {/* Pathogen Detail Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#10141d] border border-slate-200 dark:border-[#ffffff0a]">
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  Diagnosed Botanical Pathogen
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {tomatoSelectedDisease}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-300 italic font-mono mt-0.5">
                  {current.pathogen}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-[#888] font-mono mt-2 pt-2 border-t border-slate-200 dark:border-[#ffffff08]">
                  <strong>Epidemiological Risk:</strong> {current.spreadRisk}
                </div>
              </div>

              {/* Agronomic Treatment Recommendation */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-500/30 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 mb-1.5">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Recommended Agronomic Action</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-[#d1d5db] leading-relaxed">
                    {current.treatment}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                  <span>Agronomic Yield Saved: ~25%</span>
                  <span>Turnaround: Instant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#222]">
            <div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-[#888]">Architecture</div>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5">ResNet-50 + Head</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-[#888]">Validation F1</div>
              <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">97.5% Macro F1</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-[#888]">Edge Deployment</div>
              <div className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">TensorFlow Lite (TFLite)</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-[#888]">Agricultural Domain</div>
              <div className="text-xs font-bold font-mono text-violet-600 dark:text-violet-400 mt-0.5">B.Sc. Agriculture Aligned</div>
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
