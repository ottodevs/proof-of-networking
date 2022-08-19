import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'

import styles from '../styles/Home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [mounted, setMounted] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (address) {
            // fetch from API if has user data redirect to QR
            if (userData) {
                Router.push('/qr')
            } else {
                // if user is not created yet redirect to create user form
                Router.push('/create')
            }
        }
    }, [address])

    return (
        <>
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
