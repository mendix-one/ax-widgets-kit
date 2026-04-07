import { memo, type ReactElement } from 'react'

export const AiBg = memo(function AiBg(): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="ax-layout-bg-svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowLg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="waferGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c4dff" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#536dfe" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#536dfe" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="particleGrad">
          <stop offset="0%" stopColor="#80d8ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#80d8ff" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="yieldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#69f0ae" stopOpacity="0" />
          <stop offset="50%" stopColor="#69f0ae" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#69f0ae" stopOpacity="0.25" />
        </linearGradient>

        <clipPath id="waferClip">
          <circle cx="380" cy="280" r="85" />
        </clipPath>

        <style>{`
          @keyframes waferRotate {
            from { transform: rotate(0deg) }
            to   { transform: rotate(360deg) }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.2 }
            50%      { opacity: 0.5 }
          }
          @keyframes nodePulse {
            0%, 100% { r: 3; opacity: 0.6 }
            50%      { r: 5; opacity: 1 }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0) }
            50%      { transform: translateY(-8px) }
          }
          @keyframes dash {
            to { stroke-dashoffset: 0 }
          }
          @keyframes fadeStream {
            0%   { opacity: 0 }
            15%  { opacity: 0.8 }
            85%  { opacity: 0.8 }
            100% { opacity: 0 }
          }
          @keyframes scaleBreath {
            0%, 100% { transform: scale(1); opacity: 0.25 }
            50%      { transform: scale(1.08); opacity: 0.4 }
          }
          @keyframes yieldDraw {
            0%, 100% { stroke-dashoffset: 300 }
            50%      { stroke-dashoffset: 0 }
          }

          .wafer-spin {
            transform-origin: 380px 280px;
            animation: waferRotate 60s linear infinite;
          }
          .wafer-glow {
            transform-origin: 380px 280px;
            animation: scaleBreath 6s ease-in-out infinite;
          }
          .grid-line   { animation: pulse 6s ease-in-out infinite }
          .grid-line-2 { animation: pulse 6s ease-in-out 3s infinite }
          .node    { animation: nodePulse 3s ease-in-out infinite }
          .node-d1 { animation-delay: 0.5s }
          .node-d2 { animation-delay: 1.0s }
          .node-d3 { animation-delay: 1.5s }
          .node-d4 { animation-delay: 2.0s }
          .node-d5 { animation-delay: 2.5s }
          .float    { animation: floatY 5s ease-in-out infinite }
          .float-d1 { animation-delay: 0.7s }
          .float-d2 { animation-delay: 1.4s }
          .float-d3 { animation-delay: 2.1s }
          .conn    { stroke-dasharray: 6 4; stroke-dashoffset: 40; animation: dash 4s linear infinite }
          .conn-d1 { animation-delay: 0.5s }
          .conn-d2 { animation-delay: 1.0s }
          .conn-d3 { animation-delay: 1.5s }
          .conn-d4 { animation-delay: 2.0s }
          .stream    { animation: fadeStream 4s ease-in-out infinite }
          .stream-d1 { animation-delay: 1.0s }
          .stream-d2 { animation-delay: 2.0s }
          .stream-d3 { animation-delay: 3.0s }
          .yield-line {
            stroke-dasharray: 300;
            animation: yieldDraw 8s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Fab layout grid */}
      <g className="grid-line" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none">
        <line x1="80" y1="0" x2="80" y2="600" />
        <line x1="180" y1="0" x2="180" y2="600" />
        <line x1="280" y1="0" x2="280" y2="600" />
        <line x1="380" y1="0" x2="380" y2="600" />
        <line x1="480" y1="0" x2="480" y2="600" />
        <line x1="580" y1="0" x2="580" y2="600" />
        <line x1="680" y1="0" x2="680" y2="600" />
        <line x1="0" y1="80" x2="800" y2="80" />
        <line x1="0" y1="180" x2="800" y2="180" />
        <line x1="0" y1="280" x2="800" y2="280" />
        <line x1="0" y1="380" x2="800" y2="380" />
        <line x1="0" y1="480" x2="800" y2="480" />
      </g>

      {/* Silicon Wafer */}
      <circle className="wafer-glow" cx="380" cy="280" r="100" fill="url(#waferGrad)" />
      <circle cx="380" cy="280" r="85" fill="none" stroke="rgba(124,77,255,0.2)" strokeWidth="1" />
      <line x1="374" y1="365" x2="386" y2="365" stroke="rgba(124,77,255,0.3)" strokeWidth="1.5" />

      <g clipPath="url(#waferClip)" className="wafer-spin" opacity="0.12">
        <line x1="310" y1="195" x2="310" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="325" y1="195" x2="325" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="340" y1="195" x2="340" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="355" y1="195" x2="355" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="370" y1="195" x2="370" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="385" y1="195" x2="385" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="400" y1="195" x2="400" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="415" y1="195" x2="415" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="430" y1="195" x2="430" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="445" y1="195" x2="445" y2="365" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="210" x2="465" y2="210" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="225" x2="465" y2="225" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="240" x2="465" y2="240" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="255" x2="465" y2="255" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="270" x2="465" y2="270" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="285" x2="465" y2="285" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="300" x2="465" y2="300" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="315" x2="465" y2="315" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="330" x2="465" y2="330" stroke="#b388ff" strokeWidth="0.4" />
        <line x1="295" y1="345" x2="465" y2="345" stroke="#b388ff" strokeWidth="0.4" />
      </g>

      <g clipPath="url(#waferClip)">
        <line x1="295" y1="280" x2="465" y2="280" stroke="rgba(128,216,255,0.3)" strokeWidth="1">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,-85;0,85;0,-85"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0;0.4;0.4;0" dur="6s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Manufacturing Process Flow */}
      <path
        className="conn"
        d="M60,140 C120,140 140,200 200,200 S280,160 340,200 L380,280"
        fill="none"
        stroke="rgba(128,216,255,0.15)"
        strokeWidth="0.8"
      />
      <path
        className="conn conn-d2"
        d="M380,280 C420,340 480,360 540,340 S640,300 700,340 L760,360"
        fill="none"
        stroke="rgba(179,136,255,0.15)"
        strokeWidth="0.8"
      />
      <path
        className="conn conn-d1"
        d="M540,340 C560,380 600,420 660,440"
        fill="none"
        stroke="rgba(105,240,174,0.08)"
        strokeWidth="0.6"
        strokeDasharray="3 5"
      />
      <path
        className="conn conn-d3"
        d="M340,200 C360,155 400,120 460,110"
        fill="none"
        stroke="rgba(105,240,174,0.08)"
        strokeWidth="0.6"
        strokeDasharray="3 5"
      />

      {/* Process Step Nodes */}
      <g filter="url(#glow)">
        <rect className="float" x="56" y="134" width="8" height="8" rx="1.5" fill="#80d8ff" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </rect>
        <circle className="node node-d1 float-d1" cx="200" cy="200" r="3.5" fill="#b388ff" />
        <circle className="node node-d2 float-d2" cx="340" cy="200" r="3" fill="#80d8ff" />
        <circle className="node node-d3 float-d3" cx="540" cy="340" r="3.5" fill="#b388ff" />
        <rect className="float-d1" x="696" y="334" width="8" height="8" rx="1.5" fill="#80d8ff" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
        </rect>
        <circle className="node node-d4 float" cx="660" cy="440" r="2" fill="#69f0ae" />
        <circle className="node node-d5 float-d2" cx="460" cy="110" r="2" fill="#69f0ae" />
      </g>

      {/* Data stream particles */}
      <g>
        <circle r="2" fill="url(#particleGrad)" className="stream">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M60,140 C120,140 140,200 200,200 S280,160 340,200 L380,280"
          />
        </circle>
        <circle r="1.5" fill="url(#particleGrad)" className="stream stream-d1">
          <animateMotion
            dur="5.5s"
            repeatCount="indefinite"
            path="M380,280 C420,340 480,360 540,340 S640,300 700,340 L760,360"
          />
        </circle>
        <circle r="1.5" fill="url(#particleGrad)" className="stream stream-d2">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            path="M60,140 C120,140 140,200 200,200 S280,160 340,200 L380,280 C420,340 480,360 540,340 S640,300 700,340 L760,360"
          />
        </circle>
        <circle r="1" fill="url(#particleGrad)" className="stream stream-d3">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M760,360 C640,300 480,360 380,280 C280,160 140,200 60,140"
          />
        </circle>
      </g>

      {/* AI planning connections */}
      <g fill="none" strokeWidth="0.5">
        <line className="conn" x1="380" y1="280" x2="95" y2="234" stroke="rgba(128,216,255,0.1)" />
        <line className="conn conn-d1" x1="380" y1="280" x2="691" y2="201" stroke="rgba(179,136,255,0.1)" />
        <line className="conn conn-d2" x1="380" y1="280" x2="620" y2="76" stroke="rgba(128,216,255,0.08)" />
        <line className="conn conn-d3" x1="380" y1="280" x2="120" y2="480" stroke="rgba(179,136,255,0.08)" />
        <line className="conn conn-d4" x1="380" y1="280" x2="680" y2="480" stroke="rgba(128,216,255,0.08)" />
      </g>

      {/* Yield trend line */}
      <g opacity="0.35" transform="translate(60, 440)">
        <line x1="0" y1="80" x2="120" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <path
          className="yield-line"
          d="M0,70 C20,65 40,55 60,40 S90,20 120,10"
          fill="none"
          stroke="#69f0ae"
          strokeWidth="1"
          opacity="0.6"
        />
        <path d="M0,70 C20,65 40,55 60,40 S90,20 120,10 L120,80 L0,80 Z" fill="url(#yieldGrad)" opacity="0.3" />
      </g>

      {/* KPI bar chart */}
      <g opacity="0.2" transform="translate(640, 460)">
        <rect x="0" y="40" width="10" height="40" rx="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="16" y="25" width="10" height="55" rx="1" fill="#b388ff">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="32" y="15" width="10" height="65" rx="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="48" y="5" width="10" height="75" rx="1" fill="#b388ff">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="0.9s" repeatCount="indefinite" />
        </rect>
        <rect x="64" y="0" width="10" height="80" rx="1" fill="#69f0ae">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="1.2s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Fab equipment silhouettes */}
      <g stroke="rgba(128,216,255,0.08)" strokeWidth="0.6" fill="none">
        <rect x="85" y="220" width="20" height="28" rx="2" className="grid-line" />
        <line x1="90" y1="234" x2="100" y2="234" className="grid-line" />
        <rect x="680" y="190" width="22" height="22" rx="3" className="grid-line-2" />
        <circle cx="691" cy="201" r="6" className="grid-line-2" />
        <path d="M730,470 L740,455 L750,470 Z" className="grid-line" />
        <line x1="740" y1="470" x2="740" y2="485" className="grid-line" />
      </g>

      {/* 7-Pillar ecosystem hexagons */}
      <g stroke="rgba(179,136,255,0.06)" strokeWidth="0.5" fill="none" className="grid-line-2">
        <polygon points="590,60 605,52 620,60 620,76 605,84 590,76" />
        <polygon points="620,60 635,52 650,60 650,76 635,84 620,76" />
        <polygon points="605,84 620,76 635,84 635,100 620,108 605,100" />
        <polygon points="560,60 575,52 590,60 590,76 575,84 560,76" />
        <polygon points="575,84 590,76 605,84 605,100 590,108 575,100" />
        <polygon points="650,60 665,52 680,60 680,76 665,84 650,76" />
        <polygon points="635,84 650,76 665,84 665,100 650,108 635,100" />
      </g>

      {/* Floating ambient particles */}
      <g opacity="0.5">
        <circle cx="40" cy="50" r="1" fill="#80d8ff">
          <animate attributeName="cy" values="50;30;50" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="760" cy="90" r="1" fill="#b388ff">
          <animate attributeName="cy" values="90;70;90" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="560" r="1" fill="#80d8ff">
          <animate attributeName="cy" values="560;540;560" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="580" cy="530" r="1" fill="#b388ff">
          <animate attributeName="cy" values="530;510;530" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="490" r="0.8" fill="#82b1ff">
          <animate attributeName="cy" values="490;470;490" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="470" cy="160" r="0.8" fill="#82b1ff">
          <animate attributeName="cy" values="160;140;160" dur="6.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="350" r="0.8" fill="#69f0ae">
          <animate attributeName="cy" values="350;335;350" dur="7.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="7.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Wafer center AI brain icon */}
      <g filter="url(#glowLg)" transform="translate(380, 280)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        <path
          d="M-2,-12 C-8,-12 -12,-8 -12,-3 C-12,0 -10,2 -10,2 C-13,4 -12,8 -9,10 C-7,12 -3,12 -2,10"
          fill="none"
          stroke="#b388ff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2,-12 C8,-12 12,-8 12,-3 C12,0 10,2 10,2 C13,4 12,8 9,10 C7,12 3,12 2,10"
          fill="none"
          stroke="#b388ff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="0" y1="-12" x2="0" y2="10" stroke="#b388ff" strokeWidth="0.6" opacity="0.5" />
        <path d="M-2,-5 C-6,-5 -8,-3 -8,-1" fill="none" stroke="#b388ff" strokeWidth="0.6" opacity="0.6" />
        <path d="M-2,2 C-6,2 -9,4 -8,7" fill="none" stroke="#b388ff" strokeWidth="0.6" opacity="0.6" />
        <path d="M2,-5 C6,-5 8,-3 8,-1" fill="none" stroke="#b388ff" strokeWidth="0.6" opacity="0.6" />
        <path d="M2,2 C6,2 9,4 8,7" fill="none" stroke="#b388ff" strokeWidth="0.6" opacity="0.6" />
        <circle cx="-7" cy="-3" r="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="7" cy="-3" r="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="-6" cy="6" r="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="6" cy="6" r="1" fill="#80d8ff">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
})
