import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Mask,
  Rect,
  Text as SvgText,
} from "react-native-svg";

import RocketLogo from "./RocketLogo";
import { C } from "../../theme/colors";


export function SVGHeader() {
    return (
        <View style={styles.container}>
            <RocketLogo />

            <View style={styles.titleContainer}>
                <Svg width={280} height={40}>
                    <Defs>
                        <SvgLinearGradient
                            id="titleGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <Stop offset="0%" stopColor={C.neon} />
                            <Stop offset="100%" stopColor={C.purple} />
                        </SvgLinearGradient>

                        <Mask id="textMask">
                            <Rect
                                width="100%"
                                height="100%"
                                fill="black"
                            />

                            <SvgText
                                x="140"
                                y="29"
                                textAnchor="middle"
                                fill="white"
                                fontFamily="Orbitron-Black"
                                fontSize="26"
                                fontWeight="900"
                                letterSpacing="6"
                            >
                                MOON EAZY
                            </SvgText>
                        </Mask>
                    </Defs>

                    <Rect
                        width="100%"
                        height="100%"
                        fill="url(#titleGradient)"
                        mask="url(#textMask)"
                    />
                </Svg>
            </View>

            <Text style={styles.tagline}>
                Free Signals in Your Pocket.
            </Text>
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

    titleContainer: {
        marginTop: 14,
        height: 40,
    },

    tagline: {
        marginTop: 6,
        fontSize: 10,
        letterSpacing: 5,
        color: C.muted,
        fontFamily: "Outfit-Regular",
    },
});
