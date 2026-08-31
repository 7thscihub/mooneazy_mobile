import { TablesDB, Query } from 'react-native-appwrite';
import getClient from './appwriteClient.js'

const DATABASE_ID = '6a43976e003cf8a01028';
const TABLE_ID = 'signals';


function getTable(){
    const client = getClient()
    const tablesDB = new TablesDB(client);
    return tablesDB
}

export default async function getLatestSignals(){
 
    const table = getTable()
    const response = await table.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [
        Query.orderDesc('$createdAt'), 
        Query.limit(10)
        ]
    });
    // console.log(response)
    return response.rows;

};





