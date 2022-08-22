/** Component for a user profile */
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Container, Text, VStack, Stack, Flex, Button, Divider } from '@chakra-ui/react'
import List from './List'
import { EditableField } from '~/components/Profile/EditableField'
import ProfileIcon from '../media/avatar.svg'
import ProfileOneIcon from '../media/p1.png'
import ProfileTwoIcon from '../media/p2.png'

// change to contact data
const mockCProfile = [{ title: 'hidetaka.eth', icon: ProfileIcon, text: '@deepdiver_web3' }]

const mockNfts = [
    {
        id: '1',
        icon: ProfileOneIcon,
    },
    {
        id: '2',
        icon: ProfileTwoIcon,
    },
    {
        id: '1',
        icon: ProfileOneIcon,
    },
]

export default function UserProfile({ isMyProfile, profile }: any) {
    const [isEdit, setIsEdit] = useState(false)
    const router = useRouter()

    function showAll() {
        router.push('/contacts')
    }

    const hadnleEdit = () => {
        setIsEdit(!isEdit)
    }

    // TODO add note from orbis
    const renderNote = !isMyProfile && (
        <>
            <Flex justifyContent='space-between' px={2}>
                <Text fontWeight={400}>{mockNfts.length} Your Note</Text>
                <Text cursor='pointer' fontWeight={400} color='blue.400' onClick={showAll}>
                    Edit
                </Text>
            </Flex>
            <Flex>Met at EthCC Hack and ETHBarcelona</Flex>
        </>
    )
    const renderContacts = mockNfts.length && isMyProfile && (
        <>
            <Flex justifyContent='space-between' px={2}>
                <Text fontWeight={400}>{mockNfts.length} Contacts</Text>
                <Text cursor='pointer' fontWeight={400} color='blue.400' onClick={showAll}>
                    All
                </Text>
            </Flex>
            <Flex>
                {mockNfts.map((item, index) => {
                    return (
                        <Box key={index} px={1}>
                            <Link href={`/profile/${item.id}`}>
                                <a>
                                    <Image src={item.icon} alt='follower' />
                                </a>
                            </Link>
                        </Box>
                    )
                })}
            </Flex>
        </>
    )

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'left'} spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }} px={20}>
                    {isMyProfile && (
                        <Flex color='blue.400' cursor='pointer' justifyContent={'flex-end'} onClick={hadnleEdit}>
                            {isEdit ? 'Done' : 'Edit my page'}
                        </Flex>
                    )}
                    <Box p={1}>
                        {isMyProfile ? (
                            <>
                                <Image src={ProfileIcon} width='80px' height='80px' alt='profile' />
                                <EditableField isEdit={isEdit} width='30%' value={profile?.name || 'asiya'} />
                                <EditableField isEdit={isEdit} value={profile?.description || 'build things'} />
                                <EditableField isEdit={isEdit} value={profile?.twitter || 'asiya_asha'} />
                            </>
                        ) : (
                            <List data={mockCProfile} />
                        )}
                    </Box>
                    {renderContacts}
                    {renderNote}
                    <Box>Prefered contact method</Box>
                </Stack>
            </Container>
        </>
    )
}
