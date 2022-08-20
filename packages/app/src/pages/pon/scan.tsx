import { FieldValues, useForm } from 'react-hook-form'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Scan() {
    const router = useRouter()
    const { handleSubmit, register } = useForm()

    // useEffect(() => {
    //     if (!address) {
    //         router.push('/')
    //     }
    // })

    const onSubmit = async ({ did }: FieldValues) => {
        // did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56
        console.log('submited', did)
        // TODO: add some basic validation to scanned data: correct url, valid did
        router.push({ pathname: '/pon/[did]', query: { did } }, '/pon')
    }

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                PoN!
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Scan a QR profile to initiate the PoN!
            </Text>

            <FormControl id='did'>
                <FormLabel>DiD for new contact</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                    <Input
                        variant='filled'
                        type='text'
                        {...register('did', {
                            required: 'This is required',
                        })}
                    />
                </InputGroup>
            </FormControl>
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Scan</Button>
            </FormControl>
        </VStack>
    )
}
