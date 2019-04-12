// @flow
import { List } from 'immutable'
import logo from '~/assets/icons/icon_etherTokens.svg'
import { makeToken, type Token } from '~/logic/tokens/store/model/token'

export const ETH_ADDRESS = '0x000'
export const isEther = (symbol: string) => symbol === 'ETH'

export const getEthAsToken = (balance: string) => {
  const eth = makeToken({
    address: ETH_ADDRESS,
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUri: logo,
    balance,
  })

  return eth
}

export const calculateActiveErc20TokensFrom = (tokens: List<Token>) => {
  const activeTokens = List().withMutations(list => tokens.forEach((token: Token) => {
    const isDeactivated = isEther(token.symbol) || !token.status
    if (isDeactivated) {
      return
    }

    list.push(token)
  }))

  return activeTokens
}
