export function unmaskUSD(value: string): number {
  return Number.parseFloat(value.replace(/[\$,]/g, ''))
}
