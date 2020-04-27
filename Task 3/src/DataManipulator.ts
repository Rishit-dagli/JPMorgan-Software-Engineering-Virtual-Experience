import { ServerRespond } from './DataStreamer';

export interface Row {
  price_ABC: number,
  price_DEF: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratioPrices = priceABC/priceDEF;
    const upperBound = 1 + 0.03;
    const lowerBound = 1 - 0.03;
    return {
      price_ABC: priceABC,
      price_DEF: priceDEF,
      ratio: ratioPrices,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger: (ratioPrices > upperBound || ratioPrices < lowerBound) ? ratioPrices : undefined,
    };
  }
}
