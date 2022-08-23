/** Component for a user profile */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Container, Text, VStack, Stack, Flex, Button, FormControl } from '@chakra-ui/react'
import { create } from 'ipfs-http-client'
import { useOrbis } from '~/hooks'
import List from './List'
import { EditableField } from './Profile/EditableField'
import { FileUploader } from './FileUploader'
import ImageMask from './ImageMask'
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
    const [profileData, setProfileData] = useState(profile)
    const [pfpCid, setPfpCid] = useState(profile?.pfp)
    const [updateMsg, setUpdateMsg] = useState('')
    const { handleSubmit, control } = useForm()
    const { connect, updateProfile } = useOrbis()

    const router = useRouter()

    function showAll() {
        router.push('/contacts')
    }

    const hadnleEdit = () => {
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        setProfileData(profile)
        setPfpCid(profile?.pfp)
    }, [profile])

    async function onSubmit(fileVals: any) {
        const projectId = process.env.NEXT_PUBLIC_INFURA_ID
        const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

        const client = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            apiPath: '/api/v0',
            headers: {
                authorization: auth,
            },
        })

        try {
            const created = await client.add(fileVals.pfp)

            const newData = { ...profileData }
            newData.pfp = created.path

            const connected = await connect()

            if (connected) {
                const profileUpdated = await updateProfile(newData)
                if (profileUpdated) {
                    setPfpCid(created.path)
                    setUpdateMsg('Updated')
                    setTimeout(() => {
                        setUpdateMsg('')
                    }, 6000)
                }
            }
        } catch (error) {
            console.log(error)
        }
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

    const profileImage = pfpCid ? (
        <ImageMask imageCid={pfpCid} />
    ) : (
        <Image src={ProfileIcon} width='80px' height='80px' alt='avatar' />
    )

    const renderProfileImageVal = !isEdit ? (
        profileImage
    ) : (
        <FileUploader placeholder='Your avatar' control={control} name='pfp' acceptedFileTypes='image/*'>
            PFP
        </FileUploader>
    )

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'left'} spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }} px={20}>
                    {isMyProfile && (
                        <Flex color='blue.400' cursor='pointer' justifyContent={'flex-end'} onClick={hadnleEdit}>
                            {isEdit ? (
                                <Flex justifyContent='flex-end'>
                                    <FormControl id='button'>
                                        <Button onClick={handleSubmit(onSubmit)}>Update profile</Button>
                                    </FormControl>
                                </Flex>
                            ) : (
                                'Edit my page'
                            )}
                        </Flex>
                    )}
                    <Box p={1}>
                        {isMyProfile ? (
                            <>
                                {renderProfileImageVal}
                                {profile?.name && (
                                    <>
                                        <EditableField
                                            isEdit={isEdit}
                                            value={profileData?.name}
                                            onSubmit={val =>
                                                setProfileData({
                                                    ...profileData,
                                                    name: val,
                                                })
                                            }
                                        />
                                        <EditableField
                                            isEdit={isEdit}
                                            value={profileData?.description}
                                            onSubmit={val =>
                                                setProfileData({
                                                    ...profileData,
                                                    description: val,
                                                })
                                            }
                                        />
                                        <EditableField
                                            isEdit={isEdit}
                                            value={profileData?.twitter}
                                            onSubmit={val =>
                                                setProfileData({
                                                    ...profileData,
                                                    twitter: val,
                                                })
                                            }
                                        />
                                    </>
                                )}
                                <Text color='red.500'>{updateMsg}</Text>
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
