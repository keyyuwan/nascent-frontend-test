import { formatToUSD } from './format-to-usd'

export function calculateSpread(asks: Array<string[]>, bids: Array<string[]>) {
  const lowestAsk = Number.parseFloat(asks[asks.length - 1][0])
  const highestBid = Number.parseFloat(bids[0][0])

  const spread = highestBid - lowestAsk

  return formatToUSD(String(spread))
}
