import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { unmaskUSD } from '../utils/unmask-usd'
import { formatToUSD } from '../utils/format-to-usd'

const limitOrderFormSchema = z.object({
  price: z
    .string()
    .min(1, 'Price is required')
    .refine(price => {
      const formattedPrice = unmaskUSD(price)
      return formattedPrice > 0
    }, 'Please enter a valid price greater than $0.00.'),
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

export type LimitOrderFormData = z.infer<typeof limitOrderFormSchema>

export function useLimitOrderForm() {
  const form = useForm<LimitOrderFormData>({
    resolver: zodResolver(limitOrderFormSchema),
    defaultValues: {
      amount: 0,
      price: '$0.00',
      total: '$0.00',
    },
  })

  const amount = form.watch('amount')
  const price = form.watch('price')

  useEffect(() => {
    const notional = amount * unmaskUSD(price)
    const formattedNotional = formatToUSD(String(notional))

    form.setValue('total', formattedNotional)

    if (amount > 0) {
      form.trigger(['amount', 'total'])
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
