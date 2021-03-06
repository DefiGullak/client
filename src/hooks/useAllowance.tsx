import { useState, useEffect, useCallback } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import BigNumber from 'bignumber.js'
import { getPreference } from '../utils/storage'
import { MAX_UINT } from '../constants'
import { useNotify } from './useNotify'
const abi = require('../constants/abis/erc20.json')

export function useAllowance(token: string, spenderAddress: string) {
  const { web3, user } = useConnectedWallet()

  const [allowance, setAllowance] = useState(new BigNumber(0))
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(true)

  const { notifyCallback } = useNotify()

  const approve = useCallback(
    async (amount?: BigNumber, callback?: Function) => {
      if (!web3 || !user) return
      const approveMode = getPreference('approval', 'unlimited')

      const erc = new web3.eth.Contract(abi, token)
      const approveAmount = approveMode === 'normal' && amount ? amount.toString() : MAX_UINT

      if (spenderAddress === '') throw new Error('Unknown Spender')

      await erc.methods
        .approve(spenderAddress, approveAmount)
        .send({ from: user })
        .on('transactionHash', hash => {
          notifyCallback(hash)
          if (typeof callback === 'function') callback()
        })
      const newAllowance = await erc.methods.allowance(user, spenderAddress).call()
      setAllowance(new BigNumber(newAllowance.toString()))
    },
    [web3, token, user, notifyCallback, spenderAddress],
  )

  useEffect(() => {
    if (user === '') return
    const erc = new web3.eth.Contract(abi, token)
    erc.methods
      .allowance(user, spenderAddress)
      .call()
      .then(allowance => {
        setAllowance(new BigNumber(allowance.toString()))
        setIsLoadingAllowance(false)
      })
      .catch(err => {
        setIsLoadingAllowance(false)
      })
  }, [web3, spenderAddress, token, user])

  return { allowance, isLoadingAllowance, approve }
}
