import { FieldValues, useForm } from 'react-hook-form'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Textarea, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useOrbis } from '~/hooks'
import { useRouter } from 'next/router'
import { PonProfile } from '~/hooks/useOrbis'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

const schema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        twitter: yup.string().required(),
    })
    .required()

export default function NewUser() {
    const router = useRouter()
    const { address } = useAccount()
    const { connect, profile, updateProfile } = useOrbis()
    const { handleSubmit, register } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        if (!address) {
            router.push('/')
        }
        if (profile && profile.name) {
            console.log('profile found', profile.name)
            router.push('/profile')
        }
    })

    const onSubmit = async (data: FieldValues) => {
        const connected = await connect()

        if (connected) {
            const profileUpdated = await updateProfile(data as PonProfile)
            if (profileUpdated) router.push('/profile')
        }
    }

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                New Profile
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Set up your data
            </Text>
            <FormControl id='name'>
                <FormLabel>Nickname</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                    <Input
                        variant='filled'
                        type='text'
                        {...register('name', {
                            required: 'This is required',
                        })}
                    />
                </InputGroup>
            </FormControl>

            <FormControl id='description'>
                <FormLabel>Description</FormLabel>
                <Textarea
                    variant='filled'
                    _hover={{
                        borderColor: 'gray.300',
                    }}
                    placeholder='Something about you'
                    {...register('description', {
                        required: 'This is required',
                    })}
                />
            </FormControl>

            <FormControl id='twitter'>
                <FormLabel>Twitter account</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                    <Input
                        variant='filled'
                        type='text'
                        {...register('twitter', {
                            required: 'This is required',
                        })}
                    />
                </InputGroup>
            </FormControl>
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Create profile</Button>
            </FormControl>
        </VStack>
    )
}
