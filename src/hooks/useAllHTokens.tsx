import { useState } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getHTokens } from '../utils/graph'
import { hToken } from '../types'
import { useCustomToast } from './useCustomToast'

export function useAllHTokens(): { hTokens: hToken[]; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(false)
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const hTokens = useAsyncMemo(
    async () => {
      try {
        setIsLoading(true)
        const products = await getHTokens(networkId, toast.error)
        if (products === null) return []
        return products
      } finally {
        setIsLoading(false)
      }
    },
    [],
    [networkId],
  )
  return { hTokens, isLoading }
}
