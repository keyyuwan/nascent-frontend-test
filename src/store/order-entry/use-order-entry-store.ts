import { create } from 'zustand'

interface OrderEntry {
  side: 'buy' | 'sell'
  limitPrice: string
}

interface OrderEntryStore {
  orderEntry: Partial<OrderEntry> | null
  setOrderEntry: (orderentry: Partial<OrderEntry>) => void
}

export const useOrderEntryStore = create<OrderEntryStore>(set => ({
  orderEntry: null,
  setOrderEntry: data => set({ orderEntry: data }),
}))
