import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Textarea, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useOrbis } from '~/hooks'
import { PonProfile } from '~/hooks/useOrbis'
import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'

// set ipfs
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

export default function NewUser() {
    const router = useRouter()
    const { address } = useAccount()
    const { connect, profile, updateProfile } = useOrbis()
    const { handleSubmit, register, control } = useForm()

    useEffect(() => {
        if (!address) {
            router.push('/')
        }
        if (profile && profile.name) {
            console.log('profile found', profile.name)
            router.push('/profile')
        }
    })

    const onSubmit = async data => {
        try {
            const created = await client.add(data.pfp)

            const newData = { ...data }
            newData.pfp = created.path

            const connected = await connect()

            if (connected) {
                const profileUpdated = await updateProfile(newData)
                if (profileUpdated) router.push('/profile')
            }
        } catch (error) {
            console.log(error.message)
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
            <FormControl id='name' isRequired>
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
            <FileUploader name='pfp' acceptedFileTypes='image/*' placeholder='Your avatar' control={control}>
                PFP
            </FileUploader>
            <FormControl id='description' isRequired>
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
                    <Input variant='filled' type='text' {...register('twitter', {})} />
                </InputGroup>
            </FormControl>
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Create profile</Button>
            </FormControl>
        </VStack>
    )
}
