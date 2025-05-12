import { formatToUSD } from './format-to-usd'

export function calculateMidMarketPrice(
  asks: Array<string[]>,
  bids: Array<string[]>
) {
  const lowestAsk = Number.parseFloat(asks[asks.length - 1][0])
  const highestBid = Number.parseFloat(bids[0][0])

  const midMarketPrice = (lowestAsk + highestBid) / 2

  return formatToUSD(String(midMarketPrice))
}
