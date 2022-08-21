import { useState } from 'react'
import Link from 'next/link'
import { Container, Box, Stack, Input } from '@chakra-ui/react'
import ListItem from '~/components/ListItem'
import ProfileOneIcon from '~/media/p1.png'
import ProfileTwoIcon from '~/media/p2.png'

const mockContacts = [
    { id: 1, title: 'Chillas Art', icon: ProfileOneIcon, text: 'Creator of Chirazu Art' },
    { id: 2, title: 'Diva', icon: ProfileTwoIcon, text: 'digital arts creator' },
    { id: 3, title: 'Getting better', icon: ProfileTwoIcon, text: 'The creator of NFT Art community language' },
]
export default function Contacts() {
    const [searchVal, setSearchVal] = useState('')

    const handleChange = (event: any) => setSearchVal(event.target.value)

    const data = searchVal
        ? mockContacts.filter(item => item.title.toLowerCase().includes(searchVal.toLowerCase()))
        : mockContacts

    const renderContacts = data.map((item, index) => {
        return (
            <Box key={index} px={1}>
                <Link href={`/profile/${item.id}`}>
                    <a>
                        <ListItem {...item} />
                    </a>
                </Link>
            </Box>
        )
    })

    return (
        <Container maxW={'3xl'}>
            <Stack as={Box} textAlign={'left'} spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }} px={20}>
                <Box width='400px'>
                    <Input value={searchVal} variant='filled' onChange={handleChange} placeholder='Search by Name' />
                </Box>
                <Stack mt={2} as={Box} textAlign={'center'} spacing={{ base: 6, md: 8 }}>
                    {renderContacts}
                </Stack>
            </Stack>
        </Container>
    )
}
