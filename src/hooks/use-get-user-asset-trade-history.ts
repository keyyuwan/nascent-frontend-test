import { useQuery } from '@tanstack/react-query'
import type { Asset } from '../utils/assets-images'
import { getAssetTradeHistory } from '../api/get-asset-trade-history'

export function useGetUserAssetTradeHistory(asset: Asset) {
  return useQuery({
    queryKey: ['trade-history', asset],
    queryFn: () => getAssetTradeHistory(asset),
  })
}
