import { sortAsks } from './sort-asks'

describe('Sort Asks', () => {
  it('should sort asks in descending order', () => {
    const asks = [
      ['10.5', 'Ask 1'],
      ['15.2', 'Ask 2'],
      ['12.3', 'Ask 3'],
    ]

    const sortedAsks = sortAsks(asks)

    expect(sortedAsks).toEqual([
      ['15.2', 'Ask 2'],
      ['12.3', 'Ask 3'],
      ['10.5', 'Ask 1'],
    ])
  })
})
