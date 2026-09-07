import { Stack, useRouter } from "expo-router";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        // 1. Handle notification when the user clicks it (App in background)
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const appwritePath = response.notification.request.content.data?.path;
            
            if (appwritePath) {
                // Enforce fallback to root if Appwrite sends an empty or root value
                const targetRoute = appwritePath === '' ? '/' : appwritePath;
                router.navigate(targetRoute); 
            }
        });

        // 2. Handle notification if the app was completely closed/killed
        Notifications.getLastNotificationResponseAsync()
            .then(response => {
                const appwritePath = response?.notification.request.content.data?.path;
                if (appwritePath) {
                    const targetRoute = appwritePath === '' ? '/' : appwritePath;
                    router.navigate(targetRoute);
                }
            });

        return () => subscription.remove();
    }, []);


    return <Stack screenOptions={{ headerShown: false}} />;
}



