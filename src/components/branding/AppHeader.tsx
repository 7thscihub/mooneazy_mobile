import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import RocketLogo  from "./RocketLogo";
import { C } from "../../theme/colors";


export function AppHeader() {
    return (
        <View style={styles.container}>
            <RocketLogo />

            <LinearGradient
                colors={[C.neon, C.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.titleBox}
            >
                <Text style={styles.title}>
                MOONEAZY
                </Text>
            </LinearGradient>

            <Text style={styles.tagline}>RIDE THE PUMP. EARLY.</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 48,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },

    titleBox: {
        marginTop: 14,
        borderRadius: 4,
        paddingHorizontal: 2,
        paddingVertical: 2,
    },

    title: {
        fontFamily: "Orbitron-Black",
        fontSize: 26,
        fontWeight: "900",
        letterSpacing: 10,
        color: C.dark,
    },

    tagline: {
        marginTop: 6,
        fontSize: 10,
        letterSpacing: 5,
        color: C.muted,
        fontFamily: "Outfit-Regular",
    },
});

