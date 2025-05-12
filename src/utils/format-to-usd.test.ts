import { formatToUSD } from './format-to-usd'

describe('Format To USD', () => {
  it('should be able to convert a value to a formatted USD string', () => {
    const result = formatToUSD('4.00')
    expect(result).toBe('$4.00')
  })
})
