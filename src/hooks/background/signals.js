import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import {
    getPreviousSignals as fetchPreviousSignalsApi, 
    getActiveSignals as fetchActiveSignalsApi 
} from '../appwriteApi/fetchSignals.js';


const SET_PREVIOUS_SIGNALS = 'SET_PREVIOUS_SIGNALS';
const PREVIOUS_SIGNALS_KEY = '@previous_signals';
const ACTIVE_SIGNALS_KEY = '@active_signals';


TaskManager.defineTask(SET_PREVIOUS_SIGNALS, async () => {
    try {
        const response = await fetchPreviousSignalsApi();
        if (response && response.data) {
            const stringifiedData = JSON.stringify(response.data);
            const activeSignals = await fetchActiveSignalsApi(response.data);
            const stringifiedActiveSignals = JSON.stringify(activeSignals);

            await AsyncStorage.setItem(PREVIOUS_SIGNALS_KEY, stringifiedData);
            await AsyncStorage.setItem(ACTIVE_SIGNALS_KEY, stringifiedActiveSignals);
            return { status: BackgroundTask.BackgroundTaskStatus.Success };
        } 
        return { status: BackgroundTask.BackgroundTaskStatus.Success };
    } catch (error) {
        console.error("Background task failed:", error);
        return { status: BackgroundTask.BackgroundTaskStatus.Failure };
    }
});


export async function registerBackgroundFetch() {
    if (Platform.OS === 'web') return;
    const isRegistered = await TaskManager.isTaskRegisteredAsync(SET_PREVIOUS_SIGNALS);
    if (isRegistered) return;

    return BackgroundTask.registerTaskAsync(SET_PREVIOUS_SIGNALS, {
        minimumInterval: 15 * 60, // 15 minutes (OS dependent execution)
    });
}


export async function unregisterBackgroundFetch() {
    if (Platform.OS === 'web') return;
    return BackgroundTask.unregisterTaskAsync(SET_PREVIOUS_SIGNALS);
}


export async function getPreviousSignals() {
    let data = await AsyncStorage.getItem(PREVIOUS_SIGNALS_KEY);
    console.log("Previous signals from storage:", data);
    if (!data) {
        const response = await fetchPreviousSignalsApi();
        console.log("Fetched previous signals from API:", response);
        if (response) {
            data = JSON.stringify(response);
            await AsyncStorage.setItem(PREVIOUS_SIGNALS_KEY, data);
        }
    }
    console.log("Returning previous signals:", data);
    return data ? JSON.parse(data) : null;
}

export async function getActiveSignals() {
    let data = await AsyncStorage.getItem(ACTIVE_SIGNALS_KEY);
    // console.log("Active signals from storage:", data);
    if (!data) {
        const response = await fetchActiveSignalsApi(); 
        if (response && response.data) {
            data = JSON.stringify(response.data);
            await AsyncStorage.setItem(ACTIVE_SIGNALS_KEY, data);
        }
    }
    return data ? JSON.parse(data) : null;
}

