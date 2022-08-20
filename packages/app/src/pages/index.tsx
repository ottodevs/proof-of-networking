import { useState } from 'react'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Box, Heading, Container, Text, Stack, VStack } from '@chakra-ui/react'

import type { NextPage } from 'next'
import { useOrbis } from '~/hooks'

const Home: NextPage = () => {
    const router = useRouter()
    const { profile } = useOrbis()
    useAccount({
        onConnect: () => {
            console.log('connected', profile)
            // TODO: improve this flow
            if (profile) router.push('/pon/scan')
            router.push('/new')
        },
    })

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 20 }}>
                    <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'90%'}>
                        PoN
                    </Heading>
                    <Text color={'gray.400'}>Proof of Networking</Text>
                    <VStack gap={5}>
                        <Text color={'gray.600'}>Hi anon, log in with your wallet to create or view your profile</Text>
                        <ConnectButton />

                        <Box mt={3}></Box>
                    </VStack>
                </Stack>
            </Container>
        </>
    )
}

export default Home
