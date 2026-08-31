import 'react-native-url-polyfill/auto.js'; 
import { Client, Account, Databases, Storage } from 'react-native-appwrite';


export default function getClient(){
    const client = new Client()
        .setEndpoint("https://fra.cloud.appwrite.io/v1")
        .setProject("69f999960039081fe66c");

    return client
}

getClient()

