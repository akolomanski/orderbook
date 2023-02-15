export interface OrderbookLimitedResponse {
  sell: OrderbookEntry[];
  buy: OrderbookEntry[];
  timestamp: number;
  seqNo: number;
}

export interface OrderbookEntry {
  ra: number;
  pa: number;
  sa: number;
  ca: number;
  co: number;
}