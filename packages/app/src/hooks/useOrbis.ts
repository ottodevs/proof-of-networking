import { OrbisDid, Profile } from '@orbisclub/orbis-sdk'
import { useContext, useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { OrbisContext } from '~/contexts/OrbisContext'

export interface PonProfile {
    did?: string
    name: string
    description: string
    twitter?: string
    pfp?: string
}

const extractChainIdFromDid = (did: OrbisDid) => {
    const [, chainId] = did.details.metadata.chain.split(':')
    return chainId
}

export const useOrbis = () => {
    const orbis = useContext(OrbisContext)
    const [error, setError] = useState('')
    console.log('orbis')
    console.log(orbis)
    if (!orbis) {
        setError('useOrbis must be used within a OrbisProvider')
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    const { address, connector } = useAccount()
    const { chain } = useNetwork()

    const [profile, setProfile] = useState<PonProfile>()
    const [dids, setDids] = useState<OrbisDid[]>()

    console.log('DIDS')
    console.log(dids)

    useEffect(() => {
        const getDids = async () => {
            console.log('address')
            console.log(address)
            if (address) {
                const dids = await orbis.getDids(address)
                console.log('did in get did')
                console.log(dids)
                setDids(dids.data)
            }
        }
        getDids()
    }, [address, orbis])

    useEffect(() => {
        if (dids) {
            const getProfile = async () => {
                const currentChainDid = dids.find(did => extractChainIdFromDid(did) === chain?.id.toString())
                if (currentChainDid) {
                    console.log('currentChainDid')
                    console.log(currentChainDid)
                    const ponProfile: PonProfile = {
                        did: currentChainDid.did,
                        name: currentChainDid.details.profile?.username,
                        pfp: currentChainDid.details.profile?.pfp,
                        description: currentChainDid.details.profile?.description,
                        twitter: currentChainDid.details.profile?.data?.twitter,
                    }
                    setProfile(ponProfile)
                } else {
                    setError('Wrong Network')
                }
            }
            getProfile()
        }
    }, [chain?.id, dids, orbis])

    const connect = async () => {
        const orbisConnection = await orbis.isConnected()
        const isOrbisConnected = orbisConnection.status === 200
        if (!isOrbisConnected) {
            const provider = await connector?.getProvider()
            await orbis.connect(provider)
        }
        console.log('is orbis connected after connect try?', isOrbisConnected)

        return isOrbisConnected
    }

    const updateProfile = async (profile: PonProfile) => {
        const orbisProfileData: Profile = {
            cover: '',
            description: profile.description,
            pfp: profile.pfp,
            username: profile.name,
            data: { twitter: profile.twitter },
        }
        const result = await orbis.updateProfile(orbisProfileData)
        if (result.status === 200) {
            setProfile(profile)
            return true
        }
        return false
    }

    return { connect, orbis, profile, updateProfile, error }
}
