import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { C } from "../../theme/colors";
import { Trade } from "../../types/trade";
type Props = Pick< Trade, "entry" | "sl" | "tp1" | "tp2" >;


export default function TradeResultsGrid({ status, sl, tp1_status, tp2_status, }: Props){
    return (
        <View style={styles.grid}> 
            <View style={styles.item}><Text style={[ styles.label ]} >Status</Text></View>
            <View style={styles.item}><Text style={[ styles.value ]} ></Text></View>
            <View style={styles.item}><Text style={[ styles.value ]} >{tp1_status}</Text></View>
            <View style={styles.item}><Text style={[ styles.value]} >{tp2_status}</Text></View>
        </View>
    );
}


const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
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
        color: C.muted,
        fontSize: 11,
        fontWeight: "600",
        textAlign: "center",
        fontFamily: "Outfit-SemiBold",
    },
});
