import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Box, Heading, Container, Text, Stack, VStack } from '@chakra-ui/react'

import type { NextPage } from 'next'
import { useOrbis } from '~/hooks'
import LogoSvg from '../media/logo.svg'
import Scan from '~/components/Scan'

const Home: NextPage = () => {
    const { profile } = useOrbis()
    const { isConnected } = useAccount()
    const renderLanding = (
        <>
            <Heading lineHeight={'90%'}>
                <Image src={LogoSvg} alt='logo' />
            </Heading>
            <Text color={'gray.400'}>Proof of Networking</Text>
            <VStack gap={5}>
                <Text color={'gray.600'}>Hi anon, log in with your wallet to create or view your profile</Text>
                <ConnectButton />
                <Box mt={3}></Box>
            </VStack>
        </>
    )

    return (
        <>
            <Head>
                <title>PoN</title>
                <meta name='description' content='PoN' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 20 }}>
                    {!isConnected && renderLanding}
                    {isConnected && profile && <Scan profile={profile} />}
                    {isConnected && !profile && 'new'}
                </Stack>
            </Container>
        </>
    )
}

export default Home
