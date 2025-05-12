import { formatToUSD } from '../utils/format-to-usd'

export function useFormatOrderbookValues(side: string[]) {
  const [price, amount] = side
  const formattedPrice = formatToUSD(price)
  const notionalValue = Number(price) * Number(amount)
  const formattedNotional = formatToUSD(String(notionalValue))

  return {
    formattedPrice,
    formattedNotional,
    amount,
  }
}
