import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

// NEXT_PUBLIC_INFURA_ID comes from .env.local file and starts for infura project id ( api id )
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const { chains, provider } = configureChains([chain.polygon], [infuraProvider({ apiKey: infuraId }), publicProvider()])

const theme = extendTheme({
    fonts: {
        heading: `'Silkscreen', cursive`,
        body: `'Silkscreen', cursive`,
    },
})

export default function MyApp({ Component, pageProps }: AppProps) {
    const { connectors } = getDefaultWallets({
        appName: 'web3rsvp',
        chains,
    })
    const wagmiClient = createClient({
        autoConnect: true, // keeps user logged in automatically
        connectors,
        provider,
    })

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
