export function sortBids(bids: string[][]): string[][] {
  return bids
    .slice()
    .sort((a, b) => Number.parseFloat(b[0]) - Number.parseFloat(a[0]))
}
