import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../lib/query-client'
import { sendTrade, type SendTradeRequest } from '../api/send-trade'

export function usePlaceOrder() {
  return useMutation<void, Error, SendTradeRequest>({
    mutationFn: sendTrade,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['orderbook', variables.asset],
      })
    },
  })
}
