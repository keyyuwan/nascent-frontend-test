import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ORDERENTRY_STORAGE_KEY } from '../../constants/storage/keys'

interface OrderEntry {
  side: 'buy' | 'sell'
  limitPrice: string
}

interface OrderEntryStore {
  orderEntry: Partial<OrderEntry> | null
  setOrderEntry: (orderentry: Partial<OrderEntry>) => void
}

export const useOrderEntryStore = create(
  persist<OrderEntryStore>(
    set => ({
      orderEntry: null,
      setOrderEntry: data => set({ orderEntry: data }),
    }),
    {
      name: ORDERENTRY_STORAGE_KEY,
    }
  )
)
