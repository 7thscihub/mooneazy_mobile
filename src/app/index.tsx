import { Text, View, StyleSheet } from "react-native"
import { useEffect } from "react";
import { setupNotifications } from '../hooks/appwriteApi/notifications.js'
import Signals  from '../components/Signals.jsx'


export default function Index() {

    useEffect(() => {
        const handlesPushNotifications = async () => {
            await setupNotifications()
        }
        handlesPushNotifications()
    }, []);

    return (
        <View style={styles.container}> 
            <Signals />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});



