import { z } from 'zod'
import { unmaskUSD } from '../utils/unmask-usd'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { formatToUSD } from '../utils/format-to-usd'
import { useOrderbookStore } from '../store/orderbook/use-orderbook-store'

const marketOrderFormSchema = z.object({
  amount: z.number().refine(amount => {
    return amount > 0
  }, 'Please enter a valid amount greater than 0.'),
  total: z
    .string()
    .min(1, 'Total is required')
    .refine(total => {
      const formattedPrice = unmaskUSD(total)
      return formattedPrice > 0
    }, 'Total must be greater than $0.00 to place an order.'),
})

export type MarketOrderFormData = z.infer<typeof marketOrderFormSchema>

export function useMarketOrderForm() {
  const form = useForm<MarketOrderFormData>({
    resolver: zodResolver(marketOrderFormSchema),
    defaultValues: {
      amount: 0,
      total: '$0.00',
    },
  })

  const { orderbook } = useOrderbookStore()
  const price = orderbook?.midMarketPrice

  const amount = form.watch('amount')

  useEffect(() => {
    if (price) {
      const notional = amount * unmaskUSD(price)
      const formattedNotional = formatToUSD(String(notional))

      form.setValue('total', formattedNotional)

      if (amount > 0) {
        form.trigger(['amount', 'total'])
      }
    }
  }, [amount, price, form])

  function handleSlideChange(value: number) {
    form.setValue('amount', value)
  }

  return {
    formMethods: form,
    handleSlideChange,
  }
}
