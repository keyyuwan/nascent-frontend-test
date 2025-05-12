import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ORDERBOOK_STORAGE_KEY } from '../../constants/storage/keys'

interface Orderbook {
  midMarketPrice: string
}

interface OrderbookStore {
  orderbook: Partial<Orderbook> | null
  setOrderbook: (orderbook: Partial<Orderbook>) => void
}

export const useOrderbookStore = create(
  persist<OrderbookStore>(
    set => ({
      orderbook: null,
      setOrderbook: data => set({ orderbook: data }),
    }),
    {
      name: ORDERBOOK_STORAGE_KEY,
    }
  )
)
