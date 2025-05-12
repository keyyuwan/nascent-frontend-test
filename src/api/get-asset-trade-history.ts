import { api } from '../lib/api'
import type { Asset } from '../utils/assets-images'
import { formatToUSD } from '../utils/format-to-usd'
import { format } from 'date-fns'

interface History {
  price: string
  amount: string
  created_at: string
  side: 'buy' | 'sell'
}

interface HistoryResponse {
  history: History[]
}

export const getAssetTradeHistory = async (asset: Asset) => {
  const { data } = await api.get<HistoryResponse>(`/trade-history/${asset}`)

  const formattedHistory: History[] = data.history
    .map(item => {
      return {
        amount: item.amount,
        created_at: format(new Date(item.created_at), 'MMM dd, HH:mm:ss'),
        price: formatToUSD(item.price),
        side: item.side,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

  return {
    history: formattedHistory,
  }
}
