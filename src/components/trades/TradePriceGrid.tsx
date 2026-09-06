import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { C } from "../../theme/colors";
import { Trade } from "../../types/trade";

type Props = Pick< Trade, "entry" | "sl" | "tp1" | "tp2" >;

export default function TradePriceGrid({ entry_price, sl, tp1, tp2, }: Props){
    const prices = [
        { label: "Entry", value: entry_price, color: C.white, },
        { label: "SL", value: sl, color: C.red, },
        { label: "TP1", value: tp1, color: C.neon,},
        { label: "TP2", value: tp2, color: C.neon,},
    ];

    return (
        <View style={styles.grid}>
            {prices.map((price) => (
                <View key={price.label} style={styles.item} >
                    <Text style={styles.label}> {price.label} </Text>
                    <Text style={[ styles.value, { color: price.color },]} >
                        {price.value}
                    </Text>
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: C.border,
        backgroundColor: "rgba(255,255,255,0.03)",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    item: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },

    label: {
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: 2,
        fontWeight: "600",
        color: C.muted,
        fontFamily: "Outfit-SemiBold",
    },

    value: {
        fontSize: 11,
        fontWeight: "600",
        textAlign: "center",
        fontFamily: "Outfit-SemiBold",
    },
});
