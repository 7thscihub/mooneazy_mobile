import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Messaging } from 'react-native-appwrite';
import { getClient } from'./appwriteClient.js'


// 1. Initialize Appwrite Client
function getMessagingClient(){
    const client = getClient()
    const messaging = new Messaging(client);
    return messaging
}


async function setAlertProperties(){
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

async function registerDeviceToAppwrite(deviceToken){
    const targetId = 'device-target-' + Math.random().toString(36).substring(7);
    const messaging = getMessagingClient()
    await messaging.createTarget(targetId, 'push', deviceToken);
    await messaging.createSubscriber('mooneazy_signals', targetId);
}

async function checkFirstLaunch(){
    try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
        if (hasLaunched === null) {
            return false
        }
        return true
    } catch (error) {
        console.error('Storage Error:', error);
    }
};

async function setFirstLaunch(){
    if (Platform.OS === 'web') return
    await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');

}

async function setupNotifications() {
    try {
        if (Platform.OS === 'web') return
        const hasLaunched = await checkFirstLaunch()
        if (hasLaunched == true) return

        // A. Request system permissions
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;

        // B. Create Android Notification Channel with Custom Sound
               if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('custom-alerts', {
                name: 'Custom Sound Alerts',
                importance: Notifications.AndroidImportance.MAX,
                sound: 'custom_sound.mp3', 
            });
        }
        await setAlertProperties()

        // C. Fetch raw native device token (FCM/APNs)
        const tokenData = await Notifications.getDevicePushTokenAsync();
        const deviceToken = tokenData.data;

        // D. Register Device Target broadly (Anonymous or Auth-independent)
        await registerDeviceToAppwrite(deviceToken)
        await setFirstLaunch()
    } catch (error) {
        console.error('Notification Setup Error:', error);
    }
}


export { registerDeviceToAppwrite, setupNotifications }



