import React from "react";
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Trade } from "../../types/trade";
import { TradeCard } from "./TradeCard";
import { getPreviousSignals, getActiveSignals } from '../../hooks/appwriteApi/fetchSignals.js'

type Props = {
    tabStatus: "active" | "previous";
};


export function TradeList({ tabStatus }){
    const [ signals, setSignals ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    const isActive = tabStatus.toLowerCase() === 'active'

    React.useEffect(() => {
        const getTradeSignals = async () => {
            let tradeSignals = null 
            if (isActive) {
                const activeSignals = await getActiveSignals()
                tradeSignals = activeSignals? activeSignals: null
            }
            else{
                tradeSignals = await getPreviousSignals()
            }
            setSignals(tradeSignals)
            setLoading(false)
        }
        getTradeSignals()
    }, [isActive])
 

    function renderSignals(){
        if(loading){
            return <ActivityIndicator/>
        }
        if(!signals || signals.length === 0){
            return (
                <View style={ styles.noSignals }>
                    <Text style = { styles.noSignalsText }>No live signals</Text>
                    <Text style = { styles.noSignalsText }>At the moment</Text>
                </View>
            )
        }
        return signals.map((signal)=>(
            <TradeCard key={ signal.$id } signal={signal} /> 
        ))
    }


    return (
        <ScrollView style={styles.list} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            { renderSignals() }
            <View style={styles.bottomSpace} />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    list: { flex: 1, },
    content: { paddingHorizontal: 24, },
    bottomSpace: { height: 100, },
    noSignals: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 50,
        // borderWidth: 1,
        // borderColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
    },
    noSignalsText: {
        color: "white",
        fontSize: 16,
        
    }
});


