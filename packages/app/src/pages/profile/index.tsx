import { useRouter } from 'next/router'
import Image from 'next/image'
import { VStack, Button } from '@chakra-ui/react'
import UserProfile from '~/components/UserProfile'
import { useOrbis } from '~/hooks'
import ScanSvg from '../../media/scan.svg'

export default function Profile() {
    const { profile } = useOrbis()
    const router = useRouter()
    console.log(profile)
    function handleRedirect() {
        router.push({ pathname: '/scan' })
    }

    // TODO: remove test values
    return (
        <VStack spacing='10'>
            <UserProfile profile={profile} isMyProfile={true} />
            <Button onClick={handleRedirect} h={42} p='10px' backgroundColor={'#ffffff3d'}>
                <Image src={ScanSvg} alt='scan' />
            </Button>
        </VStack>
    )
}
