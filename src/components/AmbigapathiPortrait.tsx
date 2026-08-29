import React from 'react';
import { CheckCircle2, Sparkles, BrainCircuit } from 'lucide-react';

interface PortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AmbigapathiPortrait: React.FC<PortraitProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Studio Lighting Canvas & Silhouette */}
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full object-cover rounded-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Background Radial Studio Lighting */}
          <radialGradient id="studioLight" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#090d16" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#030508" stopOpacity="1" />
          </radialGradient>

          {/* Rim light gradients */}
          <linearGradient id="rimLightLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rimLightRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>

          {/* Skin monochrome shades */}
          <linearGradient id="skinShade" x1="30%" y1="10%" x2="70%" y2="90%">
            <stop offset="0%" stopColor="#a3a3a3" />
            <stop offset="35%" stopColor="#737373" />
            <stop offset="70%" stopColor="#404040" />
            <stop offset="100%" stopColor="#171717" />
          </linearGradient>

          <linearGradient id="skinHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#737373" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#262626" stopOpacity="0.1" />
          </linearGradient>

          {/* Glasses frame metallic gradient */}
          <linearGradient id="glassesFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="lensGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Studio Background */}
        <rect width="400" height="480" fill="url(#studioLight)" />

        {/* Ambient Technical Data Coordinates */}
        <g opacity="0.15">
          <line x1="20" y1="60" x2="380" y2="60" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="20" y1="420" x2="380" y2="420" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="60" y1="20" x2="60" y2="460" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="340" y1="20" x2="340" y2="460" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 4" />
        </g>

        {/* Torso & Black Crewneck T-shirt */}
        <g id="torso">
          {/* Shoulders & Chest silhouette */}
          <path
            d="M 50 480 C 60 380, 110 325, 160 310 L 240 310 C 290 325, 340 380, 350 480 Z"
            fill="#090a0f"
          />
          {/* Shirt fold & lighting definition */}
          <path
            d="M 80 480 C 100 400, 140 350, 175 330 L 225 330 C 260 350, 300 400, 320 480 Z"
            fill="#12131a"
            opacity="0.8"
          />
          {/* Crewneck Collar */}
          <path
            d="M 160 310 Q 200 340 240 310 Q 200 325 160 310 Z"
            fill="#050508"
            stroke="#262626"
            strokeWidth="1.5"
          />
          <path
            d="M 162 312 Q 200 336 238 312"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.8"
            opacity="0.4"
          />
        </g>

        {/* Neck */}
        <g id="neck">
          <path
            d="M 165 240 L 165 315 Q 200 325 235 315 L 235 240 Z"
            fill="#262626"
          />
          {/* Neck shadow & muscle highlight */}
          <path
            d="M 175 250 L 175 310 Q 200 318 225 310 L 225 250 Z"
            fill="url(#skinShade)"
            opacity="0.6"
          />
          <path
            d="M 195 260 L 195 305"
            stroke="#404040"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Head & Face Contour */}
        <g id="head">
          {/* Ears */}
          {/* Left Ear */}
          <path
            d="M 130 195 C 115 195, 115 240, 132 245 Z"
            fill="#404040"
          />
          <path
            d="M 128 205 C 122 210, 122 230, 131 235"
            fill="none"
            stroke="#262626"
            strokeWidth="2"
          />
          {/* Right Ear */}
          <path
            d="M 270 195 C 285 195, 285 240, 268 245 Z"
            fill="#525252"
          />
          <path
            d="M 272 205 C 278 210, 278 230, 269 235"
            fill="none"
            stroke="#262626"
            strokeWidth="2"
          />

          {/* Main Face Shape */}
          <path
            d="M 132 160 C 132 110, 268 110, 268 160 C 268 220, 255 275, 200 275 C 145 275, 132 220, 132 160 Z"
            fill="url(#skinShade)"
          />

          {/* Face High-Key Lighting (Cheeks and Forehead) */}
          <path
            d="M 145 150 C 145 125, 255 125, 255 150 C 255 200, 240 255, 200 255 C 160 255, 145 200, 145 150 Z"
            fill="url(#skinHighlight)"
            opacity="0.75"
          />

          {/* Hair - Short styled textured dark hair */}
          <path
            d="M 126 150 C 124 105, 150 75, 200 75 C 250 75, 276 105, 274 150 C 268 120, 250 102, 200 102 C 150 102, 132 120, 126 150 Z"
            fill="#050508"
          />
          {/* Hair texture strands */}
          <path
            d="M 135 130 C 145 95, 175 82, 205 82 C 240 82, 265 98, 268 130 C 255 110, 230 96, 200 96 C 170 96, 145 110, 135 130 Z"
            fill="#171717"
          />
          <path
            d="M 160 90 Q 200 78 240 90 Q 200 84 160 90"
            fill="#262626"
            opacity="0.7"
          />

          {/* Eyebrows */}
          <path
            d="M 152 172 Q 172 165 188 174"
            fill="none"
            stroke="#171717"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 212 174 Q 228 165 248 172"
            fill="none"
            stroke="#171717"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Eyes behind lenses */}
          <g id="eyes">
            {/* Left Eye */}
            <ellipse cx="170" cy="188" rx="10" ry="5.5" fill="#ffffff" opacity="0.8" />
            <circle cx="170" cy="188" r="4" fill="#0f172a" />
            <circle cx="171.5" cy="186.5" r="1.2" fill="#ffffff" />
            <path d="M 158 186 Q 170 180 182 186" fill="none" stroke="#262626" strokeWidth="1.8" />

            {/* Right Eye */}
            <ellipse cx="230" cy="188" rx="10" ry="5.5" fill="#ffffff" opacity="0.8" />
            <circle cx="230" cy="188" r="4" fill="#0f172a" />
            <circle cx="231.5" cy="186.5" r="1.2" fill="#ffffff" />
            <path d="M 218 186 Q 230 180 242 186" fill="none" stroke="#262626" strokeWidth="1.8" />
          </g>

          {/* Nose */}
          <path
            d="M 200 178 L 197 212 Q 200 216 203 212 Z"
            fill="#525252"
            opacity="0.6"
          />
          <path
            d="M 193 214 Q 200 220 207 214"
            fill="none"
            stroke="#262626"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="191" cy="214" rx="2.5" ry="1.5" fill="#171717" />
          <ellipse cx="209" cy="214" rx="2.5" ry="1.5" fill="#171717" />

          {/* Glasses (Modern rectangular dark frames matching photo) */}
          <g id="glasses">
            {/* Bridge */}
            <path
              d="M 186 184 Q 200 181 214 184"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Left Frame */}
            <rect
              x="146"
              y="172"
              width="42"
              height="30"
              rx="6"
              fill="url(#lensGlare)"
              stroke="#0a0a0a"
              strokeWidth="3.5"
            />
            {/* Right Frame */}
            <rect
              x="212"
              y="172"
              width="42"
              height="30"
              rx="6"
              fill="url(#lensGlare)"
              stroke="#0a0a0a"
              strokeWidth="3.5"
            />
            {/* Frame temple hinges */}
            <line x1="146" y1="180" x2="132" y2="183" stroke="#0a0a0a" strokeWidth="3" />
            <line x1="254" y1="180" x2="268" y2="183" stroke="#0a0a0a" strokeWidth="3" />
            {/* Subtle lens top reflection highlight */}
            <line x1="152" y1="176" x2="180" y2="176" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <line x1="218" y1="176" x2="246" y2="176" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Smile & Warm Mouth */}
          <g id="mouth">
            {/* Gentle smile curve */}
            <path
              d="M 182 238 Q 200 252 218 238"
              fill="#262626"
              stroke="#171717"
              strokeWidth="2"
            />
            <path
              d="M 185 239 Q 200 248 215 239"
              fill="none"
              stroke="#d4d4d4"
              strokeWidth="1"
              opacity="0.7"
            />
            {/* Lower lip highlight */}
            <path
              d="M 188 244 Q 200 250 212 244"
              fill="none"
              stroke="#525252"
              strokeWidth="1.5"
            />
          </g>

          {/* Beard & Mustache (Trimmed neat beard along jawline and chin) */}
          <g id="beard" opacity="0.85">
            {/* Mustache */}
            <path
              d="M 184 227 Q 200 225 216 227 Q 200 234 184 227 Z"
              fill="#171717"
            />
            {/* Chin beard and jawline shadow */}
            <path
              d="M 136 210 C 140 260, 160 273, 200 273 C 240 273, 260 260, 264 210 C 258 250, 235 264, 200 264 C 165 264, 142 250, 136 210 Z"
              fill="#171717"
            />
            {/* Soul patch */}
            <path
              d="M 196 250 L 204 250 L 200 258 Z"
              fill="#171717"
            />
          </g>

        </g>

        {/* Soft Studio Lighting Vignette */}
        <rect
          width="400"
          height="480"
          fill="none"
          stroke="rgba(6, 182, 212, 0.25)"
          strokeWidth="1"
          rx="12"
        />
      </svg>

      {/* Verified Data Scientist Overlay Pill */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0a]/95 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-xl whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Ambigapathi V</span>
        <span className="text-[#666]">|</span>
        <span className="text-cyan-400">Salem, TN</span>
      </div>
    </div>
  );
};
