import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { C } from "../../theme/colors";
import { TradeTab } from "../../types/trade";


type Props = {
    value: TradeTab;
    onChange: (tab: TradeTab) => void;
};

const tabs: { key: TradeTab; label: string;}[] = [
    { key: "active",  label: "Live Signals", },
    { key: "latest", label: "Previous Signals", },
];

export function SignalTabs({ value, onChange }: Props){
  return (
    <View style={styles.wrapper}>
        <View style={styles.track}>
            {tabs.map((tab) => {
            const active = value === tab.key;

            if (active) {
                return (
                <LinearGradient
                    key={tab.key}
                    colors={[C.neon, C.purple]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.active}
                >
                    <TouchableOpacity 
                        onPress={() => onChange(tab.key)}
                        style={styles.inner}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.activeText}> {tab.label} </Text>
                    </TouchableOpacity>
                 </LinearGradient>
                );
            }

            return (
                <TouchableOpacity
                    key={tab.key}
                    onPress={() => onChange(tab.key)}
                    style={styles.inactive}
                    activeOpacity={0.8}
                >
                    <Text style={styles.inactiveText}> {tab.label} </Text>
                </TouchableOpacity>
            );
        })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  track: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
    padding: 4,
  },

  active: {
    flex: 1,
    borderRadius: 999,
  },

  inner: {
    paddingVertical: 10,
    alignItems: "center",
  },

  activeText: {
    fontSize: 13,
    fontWeight: "700",
    color: C.dark,
    fontFamily: "Outfit-Bold",
  },

  inactive: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },

  inactiveText: {
    fontSize: 13,
    fontWeight: "600",
    color: C.muted,
    fontFamily: "Outfit-SemiBold",
  },
});
