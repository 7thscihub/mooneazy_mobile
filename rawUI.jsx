// App.tsx
// Dependencies:
//   npx expo install react-native-linear-gradient react-native-svg
//   expo install @expo-google-fonts/orbitron @expo-google-fonts/outfit expo-font

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, {
  Ellipse,
  Path,
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";

// ─── Theme ───────────────────────────────────────────────────────────────────

const C = {
  bg: "#060612",
  surface: "#0e0e24",
  card: "#13132e",
  neon: "#39ff7e",
  neonDim: "rgba(57,255,126,0.15)",
  purple: "#a855f7",
  purpleDim: "rgba(168,85,247,0.18)",
  border: "rgba(255,255,255,0.08)",
  muted: "rgba(255,255,255,0.4)",
  white: "#ffffff",
  dark: "#060612",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Trade = {
  coin: string;
  entry: string;
  sl: string;
  tp1: string;
  tp2: string;
  signal: string;
  direction: "BUY" | "SELL";
  time: string;
};

const TRADES: Record<"active" | "latest", Trade[]> = {
  active: [
    { coin: "PEPE",  entry: "$0.0000142", sl: "$0.0000118", tp1: "$0.0000280", tp2: "$0.0000390", signal: "SFP", direction: "BUY",  time: "2h 14m" },
    { coin: "BONK",  entry: "$0.0000219", sl: "$0.0000190", tp1: "$0.0000360", tp2: "$0.0000450", signal: "SFP", direction: "BUY",  time: "5h 02m" },
    { coin: "WIF",   entry: "$1.24",      sl: "$1.08",      tp1: "$1.55",      tp2: "$1.80",      signal: "SFP", direction: "SELL", time: "1h 47m" },
    { coin: "FLOKI", entry: "$0.000178",  sl: "$0.000155",  tp1: "$0.000210",  tp2: "$0.000240",  signal: "SFP", direction: "BUY",  time: "3h 55m" },
  ],
  latest: [
    { coin: "DOGE",  entry: "$0.091",     sl: "$0.078",     tp1: "$0.180",     tp2: "$0.260",     signal: "SFP", direction: "BUY",  time: "14m ago" },
    { coin: "SHIB",  entry: "$0.0000088", sl: "$0.0000074", tp1: "$0.0000130", tp2: "$0.0000170", signal: "SFP", direction: "SELL", time: "38m ago" },
    { coin: "TURBO", entry: "$0.0042",    sl: "$0.0036",    tp1: "$0.0058",    tp2: "$0.0070",    signal: "SFP", direction: "BUY",  time: "1h ago"  },
    { coin: "MEME",  entry: "$0.028",     sl: "$0.024",     tp1: "$0.034",     tp2: "$0.040",     signal: "SFP", direction: "SELL", time: "2h ago"  },
  ],
};

// ─── StarField ────────────────────────────────────────────────────────────────

function StarField() {
  const { width, height } = Dimensions.get("window");
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: ((i * 137.5) % 100) / 100,
    y: ((i * 97.3) % 100) / 100,
    r: i % 5 === 0 ? 1.5 : 0.8,
    op: 0.3 + (i % 4) * 0.15,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((s) => (
        <View
          key={s.id}
          style={{
            position: "absolute",
            left: s.x * width,
            top: s.y * height,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: s.r,
            backgroundColor: "#fff",
            opacity: s.op,
          }}
        />
      ))}
    </View>
  );
}

// ─── Rocket Logo ──────────────────────────────────────────────────────────────

function RocketLogo() {
  return (
    <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <Defs>
        <SvgLinearGradient id="rocketGrad" x1="22" y1="8" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#c084fc" />
          <Stop offset="100%" stopColor="#6d28d9" />
        </SvgLinearGradient>
      </Defs>
      <Ellipse cx={36} cy={54} rx={16} ry={6} fill="#39ff7e" opacity={0.18} />
      <Path d="M30 58 Q36 72 42 58" fill="#f97316" opacity={0.9} />
      <Path d="M32.5 56 Q36 66 39.5 56" fill="#fbbf24" />
      <Path d="M22 42 Q22 18 36 8 Q50 18 50 42 L42 50 L30 50 Z" fill="url(#rocketGrad)" />
      <Circle cx={36} cy={32} r={6} fill="#060612" stroke="#39ff7e" strokeWidth={1.5} />
      <Circle cx={36} cy={32} r={3.5} fill="#39ff7e" opacity={0.35} />
      <Path d="M30 48 L22 54 L28 46 Z" fill="#a855f7" />
      <Path d="M42 48 L50 54 L44 46 Z" fill="#a855f7" />
      <Circle cx={14} cy={16} r={1.2} fill="white" opacity={0.7} />
      <Circle cx={58} cy={22} r={0.9} fill="white" opacity={0.5} />
      <Circle cx={12} cy={34} r={0.7} fill="#39ff7e" opacity={0.8} />
      <Circle cx={60} cy={10} r={1} fill="white" opacity={0.6} />
    </Svg>
  );
}

// ─── TradeCard ────────────────────────────────────────────────────────────────

function TradeCard({ coin, entry, sl, tp1, tp2, signal, direction, time }: Trade) {
  const isBuy = direction === "BUY";

  const priceItems = [
    { label: "Entry", value: entry, color: C.white },
    { label: "SL",    value: sl,    color: "#f87171" },
    { label: "TP1",   value: tp1,   color: C.neon },
    { label: "TP2",   value: tp2,   color: C.neon },
  ];

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.cardTop}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: isBuy ? C.neonDim : C.purpleDim }]}>
          <Text style={[styles.avatarText, { color: isBuy ? C.neon : C.purple }]}>
            {coin.slice(0, 3)}
          </Text>
        </View>

        {/* Name + signal + time */}
        <View style={styles.cardInfo}>
          <View style={styles.cardNameRow}>
            <Text style={styles.coinName}>{coin}/USDT</Text>
            <View style={styles.signalPill}>
              <Text style={styles.signalText}>{signal}</Text>
            </View>
          </View>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {/* Direction pill */}
        <LinearGradient
          colors={isBuy ? ["#39ff7e", "#22c55e"] : ["#f87171", "#ef4444"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.directionPill}
        >
          <Text style={[styles.directionText, { color: isBuy ? C.dark : C.white }]}>
            {direction}
          </Text>
        </LinearGradient>
      </View>

      {/* Price grid */}
      <View style={styles.priceGrid}>
        {priceItems.map(({ label, value, color }) => (
          <View key={label} style={styles.priceItem}>
            <Text style={styles.priceLabel}>{label}</Text>
            <Text style={[styles.priceValue, { color }]}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<"active" | "latest">("active");
  const [alertActive, setAlertActive] = useState(false);

  const currentTrades = TRADES[tab];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <StarField />

      {/* Background orbs */}
      <View style={styles.orbPurple} />
      <View style={styles.orbGreen} />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <RocketLogo />
          <LinearGradient
            colors={["#39ff7e", "#a855f7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.titleGradientBox}
          >
            <Text style={styles.titleText}>MOONEAZY</Text>
          </LinearGradient>
          <Text style={styles.tagline}>RIDE THE PUMP. EARLY.</Text>
        </View>

        {/* ── Pill Toggle ── */}
        <View style={styles.toggleWrap}>
          <View style={styles.toggleTrack}>
            {(["active", "latest"] as const).map((t) => {
              const active = tab === t;
              return active ? (
                <LinearGradient
                  key={t}
                  colors={["#39ff7e", "#a855f7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.togglePillActive}
                >
                  <TouchableOpacity onPress={() => setTab(t)} style={styles.togglePillInner}>
                    <Text style={styles.toggleTextActive}>
                      {t === "active" ? "Live Signals" : "Previous Signals"}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity key={t} onPress={() => setTab(t)} style={styles.togglePillInactive}>
                  <Text style={styles.toggleTextInactive}>
                    {t === "active" ? "Live Signals" : "Previous Signals"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── List header ── */}
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderLeft}>
            {tab === "active" ? `${TRADES.active.length} Live` : `${TRADES.latest.length} Previous`}
          </Text>
          <Text style={styles.listHeaderRight}>● Live</Text>
        </View>

        {/* ── Trade List ── */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {currentTrades.map((trade) => (
            <TradeCard key={trade.coin} {...trade} />
          ))}
          {/* bottom padding so footer doesn't cover last card */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Footer pill CTA ── */}
      <LinearGradient
        colors={["transparent", C.bg, C.bg]}
        style={styles.footerGrad}
        pointerEvents="box-none"
      >
        {alertActive ? (
          <TouchableOpacity
            onPress={() => setAlertActive(false)}
            style={styles.alertPillOutline}
            activeOpacity={0.85}
          >
            <Text style={styles.alertPillOutlineText}>✓  Alerts Activated</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setAlertActive(true)} activeOpacity={0.85}>
            <LinearGradient
              colors={["#39ff7e", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.alertPill}
            >
              <Text style={styles.alertPillText}>🔔  Activate Alerts</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  safeArea: {
    flex: 1,
  },

  // orbs
  orbPurple: {
    position: "absolute",
    top: -80,
    left: -60,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: "rgba(168,85,247,0.12)",
  },
  orbGreen: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "rgba(57,255,126,0.07)",
  },

  // header
  header: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  titleGradientBox: {
    marginTop: 14,
    borderRadius: 4,
    // maskImage trick doesn't work in RN — use a gradient view clipped tightly
    // The text will render on top of the gradient; use a transparent text trick below
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  titleText: {
    fontFamily: "Orbitron-Black", // loaded via expo-font or system fallback
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 10,
    // In RN, gradient text requires a mask workaround.
    // Simplest approach: white text on gradient bg clipped tight, or use MaskedView.
    // For broad compatibility we set a white title on the gradient box.
    color: C.dark,
    backgroundColor: "transparent",
  },
  tagline: {
    marginTop: 6,
    fontSize: 10,
    letterSpacing: 5,
    color: C.muted,
    fontFamily: "Outfit-Regular",
  },

  // toggle
  toggleWrap: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  toggleTrack: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
    padding: 4,
  },
  togglePillActive: {
    flex: 1,
    borderRadius: 999,
  },
  togglePillInner: {
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleTextActive: {
    fontSize: 13,
    fontWeight: "700",
    color: C.dark,
    fontFamily: "Outfit-Bold",
  },
  togglePillInactive: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleTextInactive: {
    fontSize: 13,
    fontWeight: "600",
    color: C.muted,
    fontFamily: "Outfit-SemiBold",
  },

  // list
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  listHeaderLeft: {
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "600",
    color: C.muted,
    fontFamily: "Outfit-SemiBold",
  },
  listHeaderRight: {
    fontSize: 11,
    color: C.neon,
    opacity: 0.7,
    fontFamily: "Outfit-Regular",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    gap: 12,
  },

  // card
  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Orbitron-Bold",
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  coinName: {
    fontSize: 13,
    fontWeight: "600",
    color: C.white,
    fontFamily: "Outfit-SemiBold",
  },
  signalPill: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  signalText: {
    fontSize: 9,
    fontWeight: "700",
    color: C.muted,
    fontFamily: "Orbitron-Bold",
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 11,
    color: C.muted,
    fontFamily: "Outfit-Regular",
  },
  directionPill: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: "#39ff7e",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  directionText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    fontFamily: "Outfit-Bold",
  },

  // price grid
  priceGrid: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: "rgba(255,255,255,0.03)",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  priceLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "600",
    color: C.muted,
    fontFamily: "Outfit-SemiBold",
  },
  priceValue: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Outfit-SemiBold",
  },

  // footer
  footerGrad: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 36,
    paddingTop: 24,
  },
  alertPill: {
    borderRadius: 999,
    paddingHorizontal: 36,
    paddingVertical: 14,
    shadowColor: "#39ff7e",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  alertPillText: {
    fontSize: 14,
    fontWeight: "700",
    color: C.dark,
    letterSpacing: 1,
    fontFamily: "Outfit-Bold",
  },
  alertPillOutline: {
    borderRadius: 999,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: C.neon,
    backgroundColor: C.surface,
  },
  alertPillOutlineText: {
    fontSize: 14,
    fontWeight: "700",
    color: C.neon,
    letterSpacing: 1,
    fontFamily: "Outfit-Bold",
  },
});
Setup notes:

Install dependencies:

npx expo install react-native-linear-gradient react-native-svg
npx expo install expo-font @expo-google-fonts/orbitron @expo-google-fonts/outfit
Load fonts in your root before rendering (Expo):

import { useFonts } from "expo-font";
import { Orbitron_700Bold, Orbitron_900Black } from "@expo-google-fonts/orbitron";
import { Outfit_400Regular, Outfit_600SemiBold, Outfit_700Bold } from "@expo-google-fonts/outfit";

const [fontsLoaded] = useFonts({
  "Orbitron-Bold": Orbitron_700Bold,
  "Orbitron-Black": Orbitron_900Black,
  "Outfit-Regular": Outfit_400Regular,
  "Outfit-SemiBold": Outfit_600SemiBold,
  "Outfit-Bold": Outfit_700Bold,
});


// For the gradient title text (fully matching the web version), 
// wrap the title with @react-native-masked-view/masked-view 
// — the current code renders dark text on a gradient background which is a clean fallback.

