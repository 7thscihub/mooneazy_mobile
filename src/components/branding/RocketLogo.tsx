import React from "react";
import Svg, {  Ellipse,  Path,  Circle,  Defs,  LinearGradient,  Stop } from "react-native-svg";

export default function RocketLogo() {
  return (
    <Svg
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="rocketGrad"
          x1="22"
          y1="8"
          x2="50"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#c084fc" />
          <Stop offset="100%" stopColor="#6d28d9" />
        </LinearGradient>
      </Defs>

      <Ellipse
        cx={36}
        cy={54}
        rx={16}
        ry={6}
        fill="#39ff7e"
        opacity={0.18}
      />

      <Path
        d="M30 58 Q36 72 42 58"
        fill="#f97316"
        opacity={0.9}
      />

      <Path
        d="M32.5 56 Q36 66 39.5 56"
        fill="#fbbf24"
      />

      <Path
        d="M22 42 Q22 18 36 8 Q50 18 50 42 L42 50 L30 50 Z"
        fill="url(#rocketGrad)"
      />

      <Circle
        cx={36}
        cy={32}
        r={6}
        fill="#060612"
        stroke="#39ff7e"
        strokeWidth={1.5}
      />

      <Circle
        cx={36}
        cy={32}
        r={3.5}
        fill="#39ff7e"
        opacity={0.35}
      />

      <Path
        d="M30 48 L22 54 L28 46 Z"
        fill="#a855f7"
      />

      <Path
        d="M42 48 L50 54 L44 46 Z"
        fill="#a855f7"
      />

      <Circle cx={14} cy={16} r={1.2} fill="white" opacity={0.7} />
      <Circle cx={58} cy={22} r={0.9} fill="white" opacity={0.5} />
      <Circle cx={12} cy={34} r={0.7} fill="#39ff7e" opacity={0.8} />
      <Circle cx={60} cy={10} r={1} fill="white" opacity={0.6} />
    </Svg>
  );
}



