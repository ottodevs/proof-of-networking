import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useOrbis } from '~/hooks'

export default function Profile() {
    const orbis = useOrbis()
    const { connector, isConnected: isWalletConnected } = useAccount()

    const connectOrbis = async () => {
        const isOrbisConnected = await orbis.isConnected()
        console.log({ isOrbisConnected, isWalletConnected })
        if (!isOrbisConnected && isWalletConnected) {
            const provider = await connector?.getProvider()
            const res = await orbis.connect(provider)

            console.log('orbis res', res)
        }
    }

    useEffect(() => {
        connectOrbis()
    })

    return <div>Profile</div>
}
