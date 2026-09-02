import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Messaging, Account, ID } from 'react-native-appwrite';
import getClient from './appwriteClient.js';


const client = getClient();
const account = new Account(client);
const messaging = new Messaging(client);

async function setAlertProperties(){
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}


// FIXED: Automatically handles anonymous authorization session before push registration
async function registerDeviceToAppwrite(deviceToken){
    try {
        // 1. Ensure a session exists. If not, create an anonymous session.
        try {
            await account.get(); // Check if a session already exists
        } catch (sessionError) {
            // If no session exists, create a silent anonymous account session
            await account.createAnonymousSession();
        }

        // 2. Generate a valid unique target identifier
        const targetId = ID.unique(); 
        
        // 3. Register the device token securely to the active anonymous session
        await account.createPushTarget({
            targetId: targetId,
            identifier: deviceToken
        });

        // 4. Subscribe the anonymous target to your public topic channel
        await messaging.createSubscriber({
            topicId: 'mooneazy_signals',
            subscriberId: ID.unique(), 
            targetId: targetId
        });
        
    } catch (error) {
        console.error('Appwrite Push Registration Failed:', error);
        throw error; // Propagate up to show up in setupNotifications console
    }
}


async function checkFirstLaunch(){
    if (Platform.OS === 'web') return true
    try {
        const hasLaunched = await AsyncStorage.getItem('HAS_LAUNCHED_KEY');
        if (hasLaunched === null) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Storage Error:', error);
    }
}

async function setFirstLaunch(){
    if (Platform.OS === 'web') return;
    await AsyncStorage.setItem('HAS_LAUNCHED_KEY', 'true');
}


async function setupNotifications() {
    try {
        const hasLaunched = await checkFirstLaunch();
        if (hasLaunched == true) return;

        // A. Request system permissions
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;

        // B. Create Android Notification Channel with Custom Sound
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('custom-alerts', {
                name: 'trade alerts',
                importance: Notifications.AndroidImportance.MAX,
                sound: 'buzzer.wav', 
            });
        }
        await setAlertProperties();

        // C. Fetch raw native device token (FCM/APNs)
        const tokenData = await Notifications.getDevicePushTokenAsync();
        const deviceToken = tokenData.data;

        // D. Register Device Target via Anonymous Session
        await registerDeviceToAppwrite(deviceToken);
        await setFirstLaunch();
    } catch (error) {
        console.error('Notification Setup Error:', error);
    }
}


export { registerDeviceToAppwrite, setupNotifications };


