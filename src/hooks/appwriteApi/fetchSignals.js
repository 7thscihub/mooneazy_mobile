import axios from "axios";

const signalsUrl = 'https://results.fra.appwrite.run/';
const latestSignalsParams = { 'latest': 20 }


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


export async function getLatestSignals(url=signalsUrl, params=latestSignalsParams) {
    try {
        const response = await axios.get(url, { params: params, timeout: 30000 });
        const signals = response.data;
        return getFlatRows(signals);
    } catch (error) {
        console.error("Failed to fetch latest signals:", error.message);
        return null;
    }
}


function isActiveSignal(signal) {
    // console.log("Checking signal:", signal);
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


export async function getActiveSignals(signals=null){
    let latestSignals = signals 
    if (!latestSignals || latestSignals.length === 0) {
        latestSignals = await getLatestSignals()
        console.log(latestSignals)
    }
    const activeSignals = latestSignals
        .filter(signal => isActiveSignal(signal))
        .map(signal => formatSignalTime(signal))
    console.log("Active signals:", activeSignals)
    if (activeSignals.length == 0) return null
    return activeSignals

}



