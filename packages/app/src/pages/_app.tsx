import '@rainbow-me/rainbowkit/styles.css'
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '~/components/Layout'
import { useIsMounted } from '~/hooks/useIsMounted'
import { theme } from '~/lib'
import { OrbisProvider } from '~/contexts'
import type { AppProps } from 'next/app'

const { provider, webSocketProvider, chains } = configureChains([chain.polygon], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: 'Proof of Networking',
    chains,
})

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
    // added connectors from rainbowkit
    connectors,
    persister: null,
})

function PonApp({ Component, pageProps }: AppProps) {
    const monted = useIsMounted()

    return (
        monted && (
            <WagmiConfig client={client}>
                <RainbowKitProvider chains={chains}>
                    <ChakraProvider theme={theme}>
                        <OrbisProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </OrbisProvider>
                    </ChakraProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        )
    )
}

export default PonApp
