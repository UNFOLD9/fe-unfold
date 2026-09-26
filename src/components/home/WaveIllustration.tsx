export default function WaveIllustration({
  lineColor = "#E6E1F4",
  className = "w-full h-auto",
}: {
  lineColor?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Smooth curved wave path */}
      <path
        d="M 15 110 C 60 110, 80 85, 110 85 C 150 85, 160 98, 195 98 C 240 98, 265 60, 305 45"
        stroke={lineColor}
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Node 1: Yellow */}
      <g filter="url(#shadow-yellow)">
        <circle cx="95" cy="88" r="14" fill="#F6D66B" />
      </g>

      {/* Node 2: Mint Green */}
      <g filter="url(#shadow-mint)">
        <circle cx="178" cy="98" r="14" fill="#7DD3B0" />
      </g>

      {/* Node 3: Peach */}
      <g filter="url(#shadow-peach)">
        <circle cx="250" cy="72" r="14" fill="#FFB38A" />
      </g>

      {/* Filters for soft node shadows */}
      <defs>
        <filter id="shadow-yellow" x="70" y="65" width="50" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#25233A" floodOpacity="0.1" />
        </filter>
        <filter id="shadow-mint" x="153" y="75" width="50" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#25233A" floodOpacity="0.1" />
        </filter>
        <filter id="shadow-peach" x="225" y="49" width="50" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#25233A" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  );
}
