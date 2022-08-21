import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { indexer } from '@orbisclub/orbis-sdk/lib/indexer-db'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { useSignMessage, useSignTypedData } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { useOrbis } from '~/hooks'

// TODO: move this to modal as in figma designs
// TODO: sanity checks, if the profile is not PoN profile prompt to register
// TODO: add event where you both met

const conversationSchemaCommit = 'k3y52l7qbv1fryezbkk4ber0ves5rl4yzie3zdehwxqvedr0nwiqb889ufjxnihhc'

export interface PonProofMessage {
    announcement: string
    event: string
    timestamp: number
    you: {
        name: string
        address: string
        did: string
    }
    met: {
        name: string
        address: string
        did: string
    }
}

export default function PonAdd({ didProfile }: InferGetStaticPropsType<typeof getStaticProps>) {
    const { orbis } = useOrbis()
    const [timestamp] = useState<number>(Date.now())
    const [message, setMessage] = useState<PonProofMessage>()
    const [signature, setSignature] = useState<string>()
    const { signTypedData } = useSignTypedData({
        domain: {
            name: 'Proof of Networking',
            version: '1',
            chainId: '80001',
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            // TODO: add secret salt from private ENV variable
        },
        types: {
            Person: [
                { name: 'name', type: 'string' },
                { name: 'address', type: 'address' },
                { name: 'did', type: 'string' },
            ],
            Pon: [
                { name: 'announcement', type: 'string' },
                { name: 'you', type: 'Person' },
                { name: 'met', type: 'Person' },
                { name: 'event', type: 'string' },
                { name: 'timestamp', type: 'uint256' },
            ],
        },
        value: message,
        onSuccess: async signature => {
            setSignature(signature)
            if (message) {
                const content = {
                    recipients: [message?.met.did, message?.you.did],
                    context: 'proof-of-networking',
                    // TODO: replace by dynamic event name
                    name: 'Polygon BUIDL IT : Summer 2022',
                }
                const resultA = await orbis.createConversation(content)
                // const resultA = await orbis.createTileDocument(
                //     content,
                //     ['handshake'], // context
                //     conversationSchemaCommit,
                //     'Proof of Networking',
                // )
                console.log('resultA', resultA)
                // kjzl6cwe1jw1467modrz2ubownca4s7k8rwjixbh2274bkuzeikox7ozn6t790s
                // const options = { did: 'did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56' }
                // const result = await orbis.getConversations(options)
                // const result = await indexer
                //     .from('streams_mainnet_list_view')
                //     .select()
                //     .eq('family', 'Proof of Networking')
                //     .contains('tags', '["orbis"]')
                // .filter('recipients', 'cs', '["' + options.did + '"]')
                // .order('last_message_timestamp', { ascending: false })
                // console.log('resultB', result)
                // TODO: use PoN schema for encrypted messages
                const result = await orbis.sendMessage({
                    conversation_id: resultA.doc,
                    // TODO: replace by signature + ponProofMsg stringified
                    body: 'hello',
                })
                // kjzl6cwe1jw149uh0cz9dqv3wuhpniy7jqmofx3n9l4mdsc9ju4xxp8zievjy9q
                // https://node1.orbis.club/api/v0/streams/kjzl6cwe1jw149uh0cz9dqv3wuhpniy7jqmofx3n9l4mdsc9ju4xxp8zievjy9q?sync=1
                console.log('result', result)
            }
        },
    })

    useEffect(() => {
        setMessage({
            announcement: 'You are about to PoN, please check the details:',
            event: 'Polygon Buidl It Summer 2022',
            you: {
                name: 'Alice',
                address: '0x3452912b8d1D5E8bDf18C421c1d60b5A716368d0',
                did: 'did:pkh:eip155:80001:0x3452912b8d1D5E8bDf18C421c1d60b5A716368d0',
            },
            met: {
                name: 'Bob',
                address: '0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56',
                did: 'did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56',
            },
            timestamp: timestamp,
        })
    }, [timestamp])

    if (!didProfile?.data.username) return <Text>Loading...</Text>

    const signPon = () => {
        console.log('signing pon')
        // 1. ALICE eth.sign with BOB's address, timestamp and event (event will be asked for both of them as confirmation)
        signTypedData()
        // TODO: save the signature to localstorage to recover in case connectivity is lost
        // 2. ALICE publishes to ceramic, createConversation and sendMessage
        // 3. BOB app is polling ceramic for new messages
        // 4. BOB when message is received, verify signature and prompt to add second signature from BOB
        // 5. ALICE keeps polling for messages, when it is received, verify signature and create PoN tile document
        // 6. When both signatures are verified, then both add each other as contact
        // 7. Prompt to mint SBT
    }

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                You`ve met {didProfile.data.username} at Polygon Buidl It: Summer 2022
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Please sign the message in your wallet to confirm that you have met {didProfile.data.username}
            </Text>
            <Button onClick={signPon}>I am ready to sign</Button>
        </VStack>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // TODO: pass the event here
    if (!params?.did) return { notFound: true }

    const response = await indexer.from('orbis_v_profiles').select().eq('did', params.did).single()
    if (response.status !== 200) return { notFound: true }

    return {
        props: { didProfile: response },
        revalidate: 60 * 20, // In seconds: 20 minutes
    }
}
