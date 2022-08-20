import { Code, Container, Heading, VStack } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'

export default function Profile() {
    const { profile } = useOrbis()

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                Your profile
            </Heading>
            <Container>
                <Code>{JSON.stringify(profile, null, 2)}</Code>
            </Container>
        </VStack>
    )
}
