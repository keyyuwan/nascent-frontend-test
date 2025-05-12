import { api } from '../lib/api'
import type { Asset } from '../utils/assets-images'

export interface SendTradeRequest {
  asset: Asset
  side: 'buy' | 'sell'
  type: 'limit' | 'market'
  quantity: number
  price?: number
  notional: number
}

export const sendTrade = async ({
  asset,
  notional,
  price,
  quantity,
  side,
  type,
}: SendTradeRequest) => {
  await api.post('/trade', {
    asset,
    notional,
    price,
    quantity,
    side,
    type,
  })
}
