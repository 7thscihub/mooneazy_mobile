import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { C } from "../theme/colors";

type TPStatus = "success" | "pending" | "failed";
type SignalStatus = "pending" | "partial" | "success" | "failed";
type Direction = "buy" | "sell";

type SignalResult = {
  symbol: string;
  signal_type: string;
  direction: Direction;
  interval: string;
  time: number | string;
  sl: number | string;
  status: SignalStatus;
  tp1: number | string;
  tp1_status: TPStatus;
  tp2: number | string;
  tp2_status: TPStatus;
};

type SignalResultsProps = {
  signal: SignalResult;
};

function StatusPill({ status }: { status: TPStatus | SignalStatus }) {
  const statusConfig = {
    success: {
      color: C.neon,
      backgroundColor: C.neonDim,
      label: "SUCCESS",
      icon: "✓",
    },
    pending: {
      color: "#fbbf24",
      backgroundColor: "rgba(251,191,36,0.12)",
      label: "PENDING",
      icon: "•",
    },
    failed: {
      color: "#f87171",
      backgroundColor: "rgba(248,113,113,0.12)",
      label: "FAILED",
      icon: "×",
    },
    partial: {
      color: C.purple,
      backgroundColor: C.purpleDim,
      label: "PARTIAL",
      icon: "◐",
    },
  };

  const config = statusConfig[status];

  return (
    <View
      style={[
        styles.statusPill,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <Text style={[styles.statusIcon, { color: config.color }]}>
        {config.icon}
      </Text>

      <Text style={[styles.statusText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

function DirectionPill({ direction }: { direction: Direction }) {
  const isBuy = direction === "buy";

  return (
    <View
      style={[
        styles.directionPill,
        {
          backgroundColor: isBuy
            ? C.neonDim
            : "rgba(248,113,113,0.12)",
        },
      ]}
    >
      <Text
        style={[
          styles.directionText,
          {
            color: isBuy ? C.neon : "#f87171",
          },
        ]}
      >
        {direction.toUpperCase()}
      </Text>
    </View>
  );
}

function ResultRow({ label, value, status,}: {
  label: string;
  value: number | string;
  status: TPStatus;
}) {
  return (
    <View style={styles.resultRow}>
      <View style={styles.resultInfo}>
        <Text style={styles.resultLabel}>{label}</Text>

        <Text style={styles.resultValue}>
          {value}
        </Text>
      </View>

      <StatusPill status={status} />
    </View>
  );
}

export default function SignalResults({ signal,}: SignalResultsProps) {
  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.symbolContainer}>
          <View style={styles.symbolIcon}>
            <Text style={styles.symbolIconText}>
              {signal.symbol.slice(0, 3)}
            </Text>
          </View>

          <View>
            <View style={styles.symbolRow}>
              <Text style={styles.symbol}>
                {signal.symbol}
              </Text>

              <View style={styles.signalTypePill}>
                <Text style={styles.signalTypeText}>
                  {signal.signal_type}
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.interval}>
                {signal.interval}
              </Text>

              <DirectionPill direction={signal.direction} />
            </View>
          </View>
        </View>

        <StatusPill status={signal.status} />

      </View>

      {/* Signal information */}
      <View style={styles.infoGrid}>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            TIME
          </Text>

          <Text style={styles.infoValue}>
            {signal.time}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            STOP LOSS
          </Text>

          <Text style={[styles.infoValue, styles.slValue]}>
            {signal.sl}
          </Text>
        </View>

      </View>

      {/* TP results */}
      <View style={styles.results}>

        <Text style={styles.resultsTitle}>
          TARGET RESULTS
        </Text>

        <ResultRow
          label="TP1"
          value={signal.tp1}
          status={signal.tp1_status}
        />

        <ResultRow
          label="TP2"
          value={signal.tp2}
          status={signal.tp2_status}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },

  symbolContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  symbolIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.purpleDim,
  },

  symbolIconText: {
    fontSize: 10,
    fontWeight: "700",
    color: C.purple,
    fontFamily: "Orbitron-Bold",
  },

  symbolRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  symbol: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Outfit-Bold",
  },

  signalTypePill: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  signalTypeText: {
    fontSize: 8,
    color: C.muted,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "Orbitron-Bold",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },

  interval: {
    fontSize: 10,
    color: C.muted,
    fontFamily: "Outfit-Regular",
  },

  directionPill: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },

  directionText: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "Orbitron-Bold",
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  statusIcon: {
    fontSize: 12,
    fontWeight: "800",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "Orbitron-Bold",
  },

  infoGrid: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: C.border,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: "rgba(255,255,255,0.02)",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 8,
    letterSpacing: 2,
    color: C.muted,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 12,
    color: C.white,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
  },

  slValue: {
    color: "#f87171",
  },

  results: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },

  resultsTitle: {
    fontSize: 8,
    letterSpacing: 2,
    color: C.muted,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
    marginBottom: 8,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
  },

  resultInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  resultLabel: {
    width: 28,
    fontSize: 11,
    color: C.white,
    fontWeight: "700",
    fontFamily: "Orbitron-Bold",
  },

  resultValue: {
    fontSize: 12,
    color: C.neon,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
  },
});
```

Your data is now:

```tsx
const signal = {
  symbol: "BTCUSDT",
  signal_type: "sfp_buy",
  direction: "buy",
  interval: "30m",
  time: "28 Sep 2026, 05:30",
  sl: 78859.7613,

  status: "partial",

  tp1: 80285.10805,
  tp1_status: "success",

  tp2: 81140.3161,
  tp2_status: "pending",
};
```

So the header will show roughly:

`BTCUSDT  [SFP_BUY]`
`30m  [BUY]`                 `PARTIAL`

with TP1/TP2 results underneath.
