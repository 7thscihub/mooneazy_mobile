import React from "react";
import { View, StyleSheet } from "react-native";


export default function BackgroundEffects() {
    return (
        <>
        <View style={styles.purpleOrb} />
        <View style={styles.greenOrb} />
        </>
    );
}

const styles = StyleSheet.create({
    purpleOrb: {
        position: "absolute",
        top: -80,
        left: -60,
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: "rgba(168,85,247,0.12)",
    },

    greenOrb: {
        position: "absolute",
        top: -40,
        right: -40,
        width: 192,
        height: 192,
        borderRadius: 96,
        backgroundColor: "rgba(57,255,126,0.07)",
    },
});

