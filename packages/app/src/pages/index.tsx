import Image from 'next/image'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Box, Heading, Container, Text, Stack, VStack } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import Scan from '~/components/Scan'
import NewUser from '~/components/NewUser'
import LogoSvg from '../media/logo.svg'

import type { NextPage } from 'next'

const Home: NextPage = () => {
    const { address: connectedAddress } = useAccount({
        onConnect: ({ address: newAddress }) => {
            restoreCeramicSession(newAddress)
        },
        onDisconnect: () => saveCeramicSession(),
    })

    const [isOrbis, setIsOrbis] = useState(false)
    const { profile, orbis } = useOrbis()
    const { isConnected } = useAccount()

    if (!orbis) {
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    // // TODO: move session management to hooks
    // // TODO: connect orbis when session is restored and load profile
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

    useEffect(() => {
        const fetchData = async () => {
            const orbisConnection = await orbis.isConnected()
            setIsOrbis(orbisConnection)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error)
    }, [])

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
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                    {!isConnected && renderLanding}
                    {isConnected && profile && <Scan profile={profile} />}
                    {isOrbis && isConnected && !profile && <NewUser />}
                </Stack>
            </Container>
        </>
    )
}

export default Home
