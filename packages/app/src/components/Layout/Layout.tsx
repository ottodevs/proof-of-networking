import '@rainbow-me/rainbowkit/styles.css'
import { Container, Fade, SlideFade, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'

export const Layout = ({ children }: PropsWithChildren) => {
    // Use RainbowKitProvider here to be able to access ChakraUI's theme
    const rainbowOptions = useRainbowOptions()

    return (
        <RainbowKitProvider {...rainbowOptions}>
            <Container mt='20' mb='20' maxWidth={['100%', '80%', '60%']}>
                <VStack>{children}</VStack>
            </Container>
        </RainbowKitProvider>
    )
}
