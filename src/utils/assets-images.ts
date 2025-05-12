import bitcoinImg from '../assets/Bitcoin.svg.png'
import ethereumImg from '../assets/ethereum-eth.svg'

export type Asset = 'btc' | 'eth'

export const ASSETS_IMAGES: Record<Asset, { src: string; alt: string }> = {
  btc: {
    src: bitcoinImg,
    alt: 'Bitcoin logo',
  },
  eth: {
    src: ethereumImg,
    alt: 'Ethereum logo',
  },
}
