// import '../scripts/wdyr'
import '@fontsource/silkscreen/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '~/components/Layout'
import { WagmiConfig } from 'wagmi'
import { OrbisProvider } from '~/contexts'
import { theme, wagmiClient } from '~/lib'

const PonApp = ({ Component, pageProps }: AppProps) => {
    return (
        <OrbisProvider>
            <ChakraProvider theme={theme}>
                <WagmiConfig client={wagmiClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </WagmiConfig>
            </ChakraProvider>
        </OrbisProvider>
    )
}

export default PonApp
