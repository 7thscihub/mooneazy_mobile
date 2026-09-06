import React from "react";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import { Trade } from "../../types/trade";
import { TradeCard } from "./TradeCard";
import { getLatestSignals } from '../../hooks/appwriteApi/fetchSignals.js'

type Props = {
    trades: Trade[];
};

export function TradeList(){
    const [ signals, setSignals ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    React.useEffect(() => {
        const getTradeSignals = async () => {
            const latestSignals = await getLatestSignals()
            setSignals(latestSignals)
            setLoading(false)
        }
        getTradeSignals()
    }, [])

    function renderSignals(){
        if(loading){
            return <ActivityIndicator/>
        }
        if(!signals){
            return <Text>No Live Signals</Text>
        }
        return signals.map((signal)=>(
            <TradeCard key={ signal.$id } signal={signal} /> 
        ))
    }


    return (
        <ScrollView 
            style={styles.list}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            { renderSignals() }
            <View style={styles.bottomSpace} />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    list: { flex: 1, },
    content: { paddingHorizontal: 24, },
    bottomSpace: { height: 100, },
});


