import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Box, Heading, Container, Text, Stack, VStack, Spinner } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import { useIsMounted } from '~/hooks/useIsMounted'
import Scan from '~/components/Scan'
import NewUser from '~/components/NewUser'
import { CustomConnect } from '~/components/CustomConnect'
import CeramicSessionComponent from '~/components/CeramicSessionComponent'
import LogoSvg from '../media/logo.svg'

import type { NextPage } from 'next'

const Home: NextPage = () => {
    const { profile } = useOrbis()
    const { isConnected } = useAccount()
    const mounted = useIsMounted()

    const renderLanding = (
        <>
            <Heading lineHeight={'90%'}>
                <Image src={LogoSvg} alt='logo' />
            </Heading>
            <Text color={'gray.400'}>Proof of Networking</Text>
            <VStack gap={5}>
                <Text color={'gray.600'}>Hi anon, log in with your wallet to create or view your profile</Text>
                <CustomConnect />
                <Box mt={3}></Box>
            </VStack>
        </>
    )

    return (
        <>
            <Container maxW={'3xl'}>
                {!mounted ? (
                    <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                        <Spinner />
                    </Stack>
                ) : (
                    <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                        {!isConnected && renderLanding}
                        {isConnected && profile?.name && <Scan profile={profile} />}
                        {isConnected && !profile?.name && <NewUser />}
                        {isConnected && <CeramicSessionComponent />}
                    </Stack>
                )}
            </Container>
        </>
    )
}

export default Home
