
export type TradeDirection = "BUY" | "SELL";
export type TradeTab = "active" | "latest";
export type SignalsAPI = {
    url: string = "h"
} 


export type Signal = {
    $id: string;
    symbol: string;
    interval: string
    entry_price: float;
    sl: float;
    tp1: float;
    tp2: float;
    signal_type: string;
    direction: TradeDirection;
    time: string;
};


export type TradeData = Record<TradeTab, Trade[]>;


export type SignalData = {
    symbol: string;
    interval: string
    entry_price: float;
    sl: float;
    tp1: float;
    tp2: float;
    tp1_status: string;
    tp2_status: string;
    status: string;
    signal_type: string;
    direction: TradeDirection;
    time: string;
};


export type SignalMOdel = {
    $id: string;
    data: SignalData;
}


