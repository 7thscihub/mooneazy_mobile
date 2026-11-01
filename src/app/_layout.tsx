import { Stack, useRouter } from "expo-router"; 
import * as Notifications from 'expo-notifications'; 
import { useEffect } from 'react'; 
import { Platform } from 'react-native'; 
import { registerBackgroundFetch } from '../hooks/background/signals.js'; 


function handleNotificationRoute(response, router) {
    const appwritePath = response?.notification.request.content.data?.path; 
    if (!appwritePath) return;
    const targetRoute = appwritePath === '' ? '/' : appwritePath; 
    router.navigate(targetRoute);
}


export default function RootLayout() {
    const router = useRouter();

    useEffect(() => { 
        if (Platform.OS === 'web') return;

        const subscription = Notifications.addNotificationResponseReceivedListener(
            response => { handleNotificationRoute(response, router)}
        );

        Notifications.getLastNotificationResponseAsync().then(
            response => { handleNotificationRoute(response, router)}
        );

        return () => subscription.remove();
    },  [router]);

    useEffect(() => { 
        if (Platform.OS === 'web') return;
            registerBackgroundFetch();
    },  []);

    return <Stack screenOptions={{ headerShown: false }} />;
}





