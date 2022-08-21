import Image from 'next/image'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Box, Heading, Container, Text, Stack, VStack } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import Scan from '~/components/Scan'
import NewUser from '~/components/NewUser'
import { CustomConnect } from '~/components/CustomConnect'
import CeramicSessionComponent from '~/components/CeramicSessionComponent'
import LogoSvg from '../media/logo.svg'

import type { NextPage } from 'next'

const Home: NextPage = () => {
    const [isOrbis, setIsOrbis] = useState(false)
    const { profile, orbis } = useOrbis()
    const { isConnected } = useAccount()

    if (!orbis) {
        throw new Error('useOrbis must be used within a OrbisProvider')
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
                <CustomConnect />
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
                    {isConnected && <CeramicSessionComponent />}
                </Stack>
            </Container>
        </>
    )
}

export default Home
