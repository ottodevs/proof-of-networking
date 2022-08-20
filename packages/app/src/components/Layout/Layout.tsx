import '@rainbow-me/rainbowkit/styles.css'
import { Container, Fade, SlideFade, VStack } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'
import { useAnimation } from '~/hooks/useAnimation'
import { useAccount } from 'wagmi'

export const Layout = ({ children }: PropsWithChildren) => {
    const { address: connectedAddress } = useAccount({
        onConnect: ({ address: newAddress }) => {
            restoreCeramicSession(newAddress)
        },
        onDisconnect: () => saveCeramicSession(),
    })
    const animationA = useAnimation(600)
    const animationB = useAnimation(200)

    // Use RainbowKitProvider here to be able to access ChakraUI's theme
    const rainbowOptions = useRainbowOptions()

    // TODO: move session management to hooks
    // TODO: connect orbis when session is restored and load profile
    const saveCeramicSession = () => {
        // don't remove this item, rename to the account and reuse the same as lit-auth-signature
        const ceramicSession = localStorage.getItem('ceramic-session')
        if (ceramicSession) {
            const lowerCaseAddress = connectedAddress?.toLowerCase()
            console.log('saving ceramic session for address', lowerCaseAddress)
            localStorage.setItem(`ceramic-session-${lowerCaseAddress}`, ceramicSession)
            console.log('session saved, clearing credentials')
            localStorage.removeItem('ceramic-session')
        }
    }

    const restoreCeramicSession = async (address?: string) => {
        console.log('hello address', address)
        const lowerCaseAddress = address?.toLowerCase()
        // Manage ceramic session restore
        const ceramicPreviousSession = localStorage.getItem(`ceramic-session-${lowerCaseAddress}`)
        if (ceramicPreviousSession) {
            console.log('ceramic session found! restoring for address', lowerCaseAddress)
            localStorage.setItem('ceramic-session', ceramicPreviousSession)
            console.log('ceramic session restored!')
        }
    }

    return (
        <RainbowKitProvider {...rainbowOptions}>
            <SlideFade in={animationA} offsetY='-20px' style={{ zIndex: 1 }}>
                <NavBar />
            </SlideFade>
            <Fade in={animationB}>
                <Container mt='20' mb='20' maxWidth={['100%', '80%', '60%']}>
                    <VStack>{children}</VStack>
                </Container>
            </Fade>
        </RainbowKitProvider>
    )
}
