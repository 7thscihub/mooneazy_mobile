import { TablesDB, Query } from 'react-native-appwrite';
import getClient from './appwriteClient.js'

const DATABASE_ID = '6a43976e003cf8a01028';
const TABLE_ID = 'signals';


const SAMPLE_SIGNALS = [
    {
        $id: "btcusdtsfpbuy2pm",
        symbol: 'btcusdt',
        interval: '15m',
        entry_price: 68000.00,
        sl: 67000.87,
        tp1: 68898.99,
        tp2: 74098.20,
        signal_type: 'SFP_BUY',
        direction: 'BUY',
        time: '2026-09-20: 11:09:23',
    }
]


function getTable(){
    const client = getClient()
    const tablesDB = new TablesDB(client);
    return tablesDB
}


function getFlatRows(rows){
    const flatRows = rows.map(row => (
        {...row.data, $id: row.id}
    ));
    return flatRows
}


function timestampToLocal24Hour(binanceTimestamp){
    const date = new Date(binanceTimestamp);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
 
    };

    // Intl.DateTimeFormat with 'en-CA' outputs: YYYY-MM-DD, HH:MM:SS
    const formatted = new Intl.DateTimeFormat('en-CA', options).format(date);
    return formatted.replace(', ', ' ');
}


function formatSignalTime(signal){
    const localTime = timestampToLocal24Hour(signal.time)
    const formattedSignal = { ...signal, time: localTime }
    return formattedSignal
}
    

export async function getLatestSignals(limit=10, test_signals=SAMPLE_SIGNALS){
    const table = getTable()
    const response = await table.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [
            Query.orderDesc('$createdAt'), 
            Query.limit(limit)
        ]
    });
    if (response.total == 0) return test_signals
        console.log(response.rows)
    return (response.rows);
};


function isActiveSignal(signal) {
    const { interval, time } = signal;
    const value = parseInt(interval, 10);
    const unit = interval.slice(-1);

    const multipliers = {
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    if (!multipliers[unit]) {
        throw new Error(`Invalid interval: ${interval}`);
    }

    const expiryTime = time + (value * multipliers[unit] * 3);

    return Date.now() < expiryTime;
}


export async function getPreviousSignals(){
    const signals = await getLatestSignals()
    return signals.map(signal => formatSignalTime(signal))
}


export async function getActiveSignals(){
    const signals = await getLatestSignals()
    const activeSignals = signals
        .filter(signal => isActiveSignal(signal))
        .map(signal => formatSignalTime(signal))
    if (activeSignals.length == 0) return null
    return activeSignals

}



