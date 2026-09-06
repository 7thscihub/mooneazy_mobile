import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { C } from "../../theme/colors";
import { setupNotifications, isActive, setFirstLauch } from '../../hooks/appwriteApi/notifications.js'
type Props = {
    active: boolean;
    onPress: () => void;
};

export function AlertButton(){
    const [ isActive, setActive] = React.useState(false)
    
    const activateAlerts = async()=>{
        let status = await isActive()
        if (status !== true) {
            await setupNotifications()
            status = await isActive()
        }
        setActive(status)
    }

    React.useEffect(()=>{
        activateAlerts()
    }, [])

    const handlePress = async()=> {
       await setFirstLauch('false')
        activateAlerts()
    }

    function renderButton(){
        if (isActive == true) return
        return (
            <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
            <LinearGradient colors={[C.neon, C.purple]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
                <Text style={styles.buttonText}>
                🔔  Activate Alerts
                </Text>
            </LinearGradient>
            </TouchableOpacity>
        );
    }
    return ( renderButton() )
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 999,
        paddingHorizontal: 36,
        paddingVertical: 14,
        elevation: 10,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "700",
        color: C.dark,
        letterSpacing: 1,
        fontFamily: "Outfit-Bold",
    },

    outline: {
        borderRadius: 999,
        paddingHorizontal: 36,
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: C.neon,
        backgroundColor: C.surface,
    },

    outlineText: {
        fontSize: 14,
        fontWeight: "700",
        color: C.neon,
        letterSpacing: 1,
        fontFamily: "Outfit-Bold",
    },
});
