import { SupportedNetworks } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const trustedCreators = [
  '0xf668606b896389066a39b132741763e1ca6d76a2', // tester account1
]

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.Ropsten]: '',
  [SupportedNetworks.Kovan]: '0x8437F9ef63261733302229A6f5e2f1A35B1B2493',
  [SupportedNetworks.Mumbai]: '0xD199d2D55A52575DEaa6dcb747A8a22EE06A113e',
}

export const getOfficialFeeRecipient = (network: SupportedNetworks) => {
  const feeRecipient = '0xad97fAb3787527B7D280deDB1F5053106e2d5500' // testnet fee recipient

  return feeRecipient.toLowerCase()
}
