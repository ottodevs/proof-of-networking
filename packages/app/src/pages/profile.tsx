import { Heading, VStack } from '@chakra-ui/react'
import { EditableField } from '~/components/Profile/EditableField'
import { useOrbis } from '~/hooks'

export default function Profile() {
    const { profile } = useOrbis()
    console.log({ profile })

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
        </VStack>
    )
}
