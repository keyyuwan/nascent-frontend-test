import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { unmaskUSD } from '../utils/unmask-usd'
import { formatToUSD } from '../utils/format-to-usd'
import { useOrderEntryStore } from '../store/order-entry/use-order-entry-store'

const limitOrderFormSchema = z.object({
  price: z
    .string()
    .min(1, 'Price is required')
    .refine(price => {
      const formattedPrice = unmaskUSD(price)
      return formattedPrice > 0
    }, 'Please enter a valid price greater than $0.00.'),
  amount: z.string().refine(amount => {
    return Number(amount) > 0 && Number(amount) <= 1
  }, 'Please enter a valid amount greater than 0 and lower or equal than 1.'),
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
  const { orderEntry } = useOrderEntryStore()
  const form = useForm<LimitOrderFormData>({
    resolver: zodResolver(limitOrderFormSchema),
    defaultValues: {
      amount: '0',
      price: '$0.00',
      total: '$0.00',
    },
  })

  const amount = form.watch('amount')
  const price = form.watch('price')
  const total = form.watch('total')

  // price & amount -> calculate notional
  // amount & notional -> calculate price
  // price & notional -> calculate amount

  useEffect(() => {
    const notional = Number(amount) * unmaskUSD(price)
    const formattedNotional = formatToUSD(String(notional))

    form.setValue('total', formattedNotional)

    if (Number(amount) > 0) {
      form.trigger(['amount', 'total'])
    }
  }, [amount, price, form])

  // useEffect(() => {
  //   const notional = amount * unmaskUSD(price)
  //   const formattedNotional = formatToUSD(String(notional))

  //   form.setValue('total', formattedNotional)

  //   if (amount > 0) {
  //     form.trigger(['amount', 'total'])
  //   }
  // }, [amount, total, form])

  useEffect(() => {
    if (orderEntry?.limitPrice) {
      form.setValue('price', orderEntry.limitPrice)
    }
  }, [orderEntry?.limitPrice, form])

  useEffect(() => {
    form.reset()
  }, [form])

  function handleSlideChange(value: number) {
    form.setValue('amount', String(value))
  }

  return {
    formMethods: form,
    handleSlideChange,
  }
}
