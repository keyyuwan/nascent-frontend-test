import { calculateMidMarketPrice } from './calculate-mid-market-price'
import { formatToUSD } from './format-to-usd'
import { sortAsks } from './sort-asks'
import { sortBids } from './sort-bids'

describe('Calculate Mid Market Price', () => {
  it('should be able to calculate the mid-market price given a list of bids and asks', () => {
    const bids = [
      ['10.5', 'Bid 1'],
      ['15.2', 'Bid 2'],
      ['12.3', 'Bid 3'],
    ]

    const asks = [
      ['5.5', 'Ask 1'],
      ['12.2', 'Ask 2'],
      ['11.3', 'Ask 3'],
    ]

    const sortedBids = sortBids(bids)
    const sortedAsks = sortAsks(asks)

    const midMarketPrice = calculateMidMarketPrice(sortedAsks, sortedBids)

    const expectedMidMarketPrice = (15.2 + 5.5) / 2
    const expectedMidMarketPriceFormatted = formatToUSD(
      String(expectedMidMarketPrice)
    )

    expect(midMarketPrice).toBe(expectedMidMarketPriceFormatted)
  })
})
