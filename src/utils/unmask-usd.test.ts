import { unmaskUSD } from './unmask-usd'

describe('Unmask USD', () => {
  it('should be able to convert a formatted USD value to a number', () => {
    const result = unmaskUSD('$4.00')
    expect(result).toBe(4)
  })
})
