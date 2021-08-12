import { SupportedNetworks } from './enums'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

export const subgraph: graphEndPointType = {
  // [SupportedNetworks.Mainnet]: 'https://api.thegraph.com/subgraphs/name/antoncoding/hodl-mainnet'
  [SupportedNetworks.Ropsten]: '',
  [SupportedNetworks.Kovan]: ' https://api.studio.thegraph.com/query/5251/defi-gullak-kovan/0.0.1',
  [SupportedNetworks.Mumbai]: 'https://api.studio.thegraph.com/query/5251/defi-gullak/0.0.1',
}

export const DISCORD = 'https://discord.gg/'
export const TWITTER = 'https://twitter.com/'
export const GITHUB = 'https://github.com/Defigullak'
