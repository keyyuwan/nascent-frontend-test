import { calculateSpread } from './calculate-spread'
import { formatToUSD } from './format-to-usd'
import { sortAsks } from './sort-asks'
import { sortBids } from './sort-bids'

describe('Calculate Spread', () => {
  it('should be able to calculate the spread value given a list of bids and asks', () => {
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

    const spread = calculateSpread(sortedAsks, sortedBids)

    const expectedSpread = 15.2 - 5.5
    const expectedSpreadFormatted = formatToUSD(String(expectedSpread))

    expect(spread).toBe(expectedSpreadFormatted)
  })
})
