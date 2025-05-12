import { useQuery } from '@tanstack/react-query'
import type { Asset } from '../utils/assets-images'
import { useOrderbookStore } from '../store/orderbook/use-orderbook-store'
import { useEffect } from 'react'
import { getOrderbook } from '../api/get-orderbook'

export function useGetOrderbook(asset: Asset) {
  const { orderbook, setOrderbook } = useOrderbookStore()

  const query = useQuery({
    queryKey: ['orderbook', asset],
    queryFn: () => getOrderbook(asset),
  })

  useEffect(() => {
    if (query.data?.midMarketPrice !== orderbook?.midMarketPrice) {
      setOrderbook({
        midMarketPrice: query.data?.midMarketPrice,
      })
    }
  }, [query.data, orderbook?.midMarketPrice, setOrderbook])

  return query
}
