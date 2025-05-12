export function sortAsks(asks: Array<string[]>) {
  return asks
    .slice()
    .sort((a, b) => Number.parseFloat(b[0]) - Number.parseFloat(a[0]))
}
