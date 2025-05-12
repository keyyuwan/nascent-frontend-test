import { sortBids } from './sort-bids'

describe('Sort Bids', () => {
  it('should sort bids in descending order', () => {
    const bids = [
      ['10.5', 'Bid 1'],
      ['15.2', 'Bid 2'],
      ['12.3', 'Bid 3'],
    ]

    const sortedBids = sortBids(bids)

    expect(sortedBids).toEqual([
      ['15.2', 'Bid 2'],
      ['12.3', 'Bid 3'],
      ['10.5', 'Bid 1'],
    ])
  })
})
