import {View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import  getLatestSignals  from '../hooks/appwriteApi/fetchSignals.js'
import SignalCard from './SignalCard.jsx'


export default function Signals(){
    const [ signals, setSignals ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const  [ error, setError ] = useState(null)
 
    useEffect(() => {
        const getSignals = async() => {
            const tradeSignals = await getLatestSignals();
            console.log(tradeSignals)
            setSignals(tradeSignals)
            setLoading(false)
        }
        getSignals()
    }, []);

    function renderSignals(){
        if(loading){
            return <ActivityIndicator/>
        }
        if(!signals){
            return <Text>No Signals</Text>
        }
        return signals.map((signal)=>(
            <SignalCard key={ signal.id } { ...signal} /> 
        ))
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Latest Signals</Text>
            {renderSignals()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});







