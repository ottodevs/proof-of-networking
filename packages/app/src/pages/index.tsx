import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 20 }}>
                    <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'90%'}>
                        PoN
                    </Heading>
                    <Text color={'gray.400'}>Proof of Networking</Text>
                    <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
                        <ConnectButton />

                        <Box mt={3}></Box>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

export default Home
