import { api } from '../lib/api'
import type { Asset } from '../utils/assets-images'
import { calculateMidMarketPrice } from '../utils/calculate-mid-market-price'
import { calculateSpread } from '../utils/calculate-spread'
import { sortAsks } from '../utils/sort-asks'

interface OrderbookResponse {
  lastUpdateId: number
  asks: Array<string[]>
  bids: Array<string[]>
}

interface GetOrderbookResponse extends OrderbookResponse {
  midMarketPrice: string
  spread: string
}

export const getOrderbook = async (asset: Asset) => {
  const { data } = await api.get<OrderbookResponse>(`/orderbook/${asset}`)

  const sortedAsks = sortAsks(data.asks)
  const sortedBids = sortAsks(data.bids)

  const formattedData: GetOrderbookResponse = {
    ...data,
    asks: sortedAsks,
    bids: sortedBids,
    midMarketPrice: calculateMidMarketPrice(sortedAsks, sortedBids),
    spread: calculateSpread(sortedAsks, sortedBids),
  }

  return formattedData
}
