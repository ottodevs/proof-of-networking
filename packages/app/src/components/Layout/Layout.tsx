import { Container, Fade, SlideFade, VStack } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { PropsWithChildren } from 'react'

import { useAnimation } from '~/hooks/useAnimation'

export const Layout = ({ children }: PropsWithChildren) => {
    const animationA = useAnimation(600)
    const animationB = useAnimation(200)

    return (
        <>
            <SlideFade in={animationA} offsetY='-20px' style={{ zIndex: 1 }}>
                <NavBar />
            </SlideFade>
            <Fade in={animationB}>
                <Container mt='20' mb='20' maxWidth={['100%', '80%', '60%']}>
                    <VStack>{children}</VStack>
                </Container>
            </Fade>
        </>
    )
}
