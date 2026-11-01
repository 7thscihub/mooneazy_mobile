import axios from 'axios';


const signalsUrl = 'https://results.fra.appwrite.run/';
const latestParams = { 'latest': 20 }


export async function getLatestSignals(url=signalsUrl, params=latestParams) {
    try {
        const response = await axios.get(url, { params: params });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch latest signals:", error.message);
        return null;
    }
}


