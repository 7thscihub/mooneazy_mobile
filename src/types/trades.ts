export type TradeDirection = "BUY" | "SELL";
export type TradeTab = "active" | "latest";

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


