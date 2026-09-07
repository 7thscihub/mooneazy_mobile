import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { C } from "../theme/colors";
import { TRADES } from "../data/trades";
import { TradeTab } from "../types/trade";

import StarField from "../components/background/StarField";
import BackgroundEffects from "../components/background/BackgroundEffects";
import { SignalTabs } from "../components/navigation/SignalTabs";
import { TradeList } from "../components/trades/TradeList";
import { AlertButton } from "../components/alerts/AlertButton";
import { SVGHeader } from "../components/branding/SVGHeader.jsx";
import { getActiveSignals, getPreviousSignals } from '../hooks/appwriteApi/fetchSignals.js'


export default function HomeScreen() {
    const [tab, setTab] = useState<TradeTab>("active");
    const [alertsActive, setAlertsActive] = useState(false);
 
    return (
        <View style={styles.root}>
            {/* Full-screen background */}
            <View style={styles.background} pointerEvents="none">
                <StarField />
                <BackgroundEffects />
            </View>

            {/* Content */}
            <View style={styles.safeArea}>
                <SVGHeader />
                <SignalTabs value={tab} onChange={setTab} />
                <View style={styles.listHeader}>
                    <Text style={styles.live}>{tab === 'active'? '● Live': 'Previous'}</Text>
                </View>
                <TradeList tabStatus={tab} />
            </View>

            {/* Bottom CTA */}
            <LinearGradient colors={["transparent", C.bg, C.bg]} style={styles.footer} pointerEvents="box-none">
                <AlertButton active={alertsActive} onPress={() => setAlertsActive((value) => !value)}/>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: C.bg,
    },

    background: {
        ...StyleSheet.absoluteFillObject,
    },

    safeArea: {
        flex: 1,
    },

    listHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        marginBottom: 10,
        textAlign: 'center'
    },

    listTitle: {
        fontSize: 10,
        letterSpacing: 3,
        textTransform: "uppercase",
        fontWeight: "600",
        color: C.muted,
        fontFamily: "Outfit-SemiBold",
    },

    live: {
        fontSize: 14,
        color: C.neon,
        opacity: 0.7,
        fontFamily: "Outfit-Regular",
        textAlign: 'center'
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingBottom: 36,
        paddingTop: 24,
    },
});


