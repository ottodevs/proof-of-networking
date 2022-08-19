import { publicProvider } from 'wagmi/providers/public'
import { chain, configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

export const { chains, provider, webSocketProvider } = configureChains(
    [chain.polygonMumbai, chain.polygon],
    [publicProvider()],
)

export const { connectors } = getDefaultWallets({
    appName: 'Web3 Patreon',
    chains,
})

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
})
