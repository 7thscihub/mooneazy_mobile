import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default function StarField() {

    const { width, height } = Dimensions.get("window");
    const stars = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: ((i * 137.5) % 100) / 100,
        y: ((i * 97.3) % 100) / 100,
        r: i % 5 === 0 ? 1.5 : 0.8,
        opacity: 0.3 + (i % 4) * 0.15,
    }));


    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {stars.map((star) => (
            <View
            key={star.id}
            style={[
                styles.star,
                {
                    left: star.x * width,
                    top: star.y * height,
                    width: star.r * 2,
                    height: star.r * 2,
                    borderRadius: star.r,
                    opacity: star.opacity,
                },
            ]}
            />
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    star: {
        position: "absolute",
        backgroundColor: "#fff",
    },
});
