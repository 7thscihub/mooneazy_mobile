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
        if (error.code === 409 || error.type === 'target_already_exists'){
            console.info(error)
        }
        else{
            console.error(error)
        }
    }
}


async function checkFirstLaunch(){
    if (Platform.OS === 'web') return true
    try {
        const hasLaunched = await AsyncStorage.getItem('HAS_LAUNCHED_KEY');
        if (hasLaunched === null) {
            return false;
        }
        return hasLaunched.toLowerCase() == true;
    } catch (error) {
        console.error('Storage Error:', error);
        return false
    }
}


async function setFirstLaunch(value){
    if (Platform.OS === 'web') return;
    await AsyncStorage.setItem('HAS_LAUNCHED_KEY', value);
}

async function isActive(){
    if (Platform.OS === 'web') return true
    const status = await AsyncStorage.getItem('IS_ACTIVE');
    return status? status.toLowerCase() === 'true': false
}


async function setActive(value){
    if (Platform.OS === 'web') return;
    await AsyncStorage.setItem('IS_ACTIVE', value);

}


async function setupNotifications() {
    try {
        if (Platform.OS === 'web') return
        const hasLaunched = await checkFirstLaunch();
        const active = await isActive()
        if (hasLaunched == true && active == false) return;

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
        await setFirstLaunch('true');
        await setActive('true')
    } catch (error) {
        console.error('Notification Setup Error:', error);
    }
}


export { registerDeviceToAppwrite, setupNotifications, isActive, setFirstLaunch };


