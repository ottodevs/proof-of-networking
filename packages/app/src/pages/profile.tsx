import { useRouter } from 'next/router'
import { Heading, VStack, Button } from '@chakra-ui/react'
import { EditableField } from '~/components/Profile/EditableField'
import { useOrbis } from '~/hooks'

export default function Profile() {
    const { profile } = useOrbis()
    const router = useRouter()

    function handleRedirect() {
        router.push({ pathname: '/' })
    }

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                Your profile
            </Heading>
            <VStack minWidth={'100%'} minH={'100%'} maxH={'100%'} spacing={'5'}>
                <EditableField value={profile?.name} />
                <EditableField value={profile?.description} />
                <EditableField value={profile?.twitter} />
            </VStack>
            <Button onClick={handleRedirect} h={42} p='10px' backgroundColor={'#ffffff3d'}>
                Go to Scanner
            </Button>
        </VStack>
    )
}
