import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { indexer } from '@orbisclub/orbis-sdk/lib/indexer-db'
import { Heading, Text, VStack } from '@chakra-ui/react'

// TODO: move this to modal as in figma designs
// TODO: sanity checks, if the profile is not PoN profile prompt to register
// TODO: add event where you both met
export default function PonAdd({ didProfile }: InferGetStaticPropsType<typeof getStaticProps>) {
    console.log('profile loaded!', didProfile)
    if (!didProfile?.data.username) return <Text>Loading...</Text>

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                You`ve met {didProfile.data.username} at Polygon Buidl It: Summer 2022
            </Heading>
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
    if (!params?.did) return { notFound: true }

    const response = await indexer.from('orbis_v_profiles').select().eq('did', params.did).single()
    if (response.status !== 200) return { notFound: true }

    return {
        props: { didProfile: response },
        revalidate: 60 * 20, // In seconds: 20 minutes
    }
}
