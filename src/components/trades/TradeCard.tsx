import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { C } from "../../theme/colors";
import { Signal } from "../../types/trade";
import TradePriceGrid from "./TradePriceGrid";
import { getLatestSignals } from '../../hooks/appwriteApi/fetchSignals.js'

type Props = {
    signal: Signal;
};


export function TradeCard({ signal }: Props) {

    const isBuy = signal.direction.toLowerCase() === "buy";
    return (
        <View style={styles.card} >
            <View style={styles.top}>
            {/* Avatar */}
            <View style={[ styles.avatar, { backgroundColor: isBuy? C.neonDim : C.purpleDim, } ]}>
                <Text style={[ styles.avatarText, { color: isBuy? C.neon : C.purple, }, ]}>
                    { signal.symbol.slice(0, 3).toUpperCase() }
                </Text>
            </View>
            {/* Trade info */}
            <View style={styles.info}>
                <View style={styles.nameRow}>
                    <Text style={ styles.coin }>{ signal.interval }</Text>
                    <View style={styles.signal}>
                        <Text style={styles.signalText}>{signal.signal_type}</Text>
                    </View>
                </View>

                <Text style={styles.time}>{signal.time}</Text>
            </View>

            {/* Direction */}
            <LinearGradient 
                colors={isBuy? [C.neon, "#22c55e"]: [C.red, C.redStrong]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.direction}
            >
                <Text style={[ styles.directionText, {color: isBuy? C.dark : C.white, },]}>
                    {signal.direction}
                </Text>
            </LinearGradient>
        </View>
        <TradePriceGrid entry_price={signal.entry_price} sl={signal.sl} tp1={signal.tp1} tp2={signal.tp2}/>
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

    top: {
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

    info: {
        flex: 1,
        gap: 4,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    coin: {
        fontSize: 13,
        fontWeight: "600",
        color: C.white,
        fontFamily: "Outfit-SemiBold",
    },

    signal: {
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

    time: {
        fontSize: 11,
        color: C.muted,
        fontFamily: "Outfit-Regular",
    },

    direction: {
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 6,
        elevation: 6,
    },

    directionText: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 2,
        fontFamily: "Outfit-Bold",
    },
});
