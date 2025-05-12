export function formatToUSD(amount: string) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number.parseFloat(amount))

  return formattedAmount
}
