import { OrbisDid, Profile } from '@orbisclub/orbis-sdk'
import { useContext, useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { OrbisContext } from '~/contexts/OrbisContext'

export interface PonProfile {
    did?: string
    name: string
    description: string
    twitter?: string
}

const extractChainIdFromDid = (did: OrbisDid) => {
    const [, chainId] = did.details.metadata.chain.split(':')
    return chainId
}

export const useOrbis = () => {
    const orbis = useContext(OrbisContext)

    if (!orbis) {
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    const [profile, setProfile] = useState<PonProfile>()
    const [dids, setDids] = useState<OrbisDid[]>()
    const { address, connector, isConnected: isWalletConnected } = useAccount()
    const { chain } = useNetwork()

    useEffect(() => {
        const getDids = async () => {
            const dids = await orbis.getDids(address)
            setDids(dids.data)
        }
        getDids()
    }, [address, orbis])

    useEffect(() => {
        if (dids) {
            const getProfile = async () => {
                const currentChainDid = dids.find(did => extractChainIdFromDid(did) === chain?.id.toString())
                if (currentChainDid) {
                    const ponProfile: PonProfile = {
                        did: currentChainDid.did,
                        name: currentChainDid.details.profile.username,
                        description: currentChainDid.details.profile.description,
                        twitter: currentChainDid.details.profile.data?.twitter,
                    }
                    setProfile(ponProfile)
                }
            }
            getProfile()
        }
    }, [chain?.id, dids, orbis])

    const connect = async () => {
        const orbisConnection = await orbis.isConnected()
        const isOrbisConnected = orbisConnection.status === 200
        if (isWalletConnected && !isOrbisConnected) {
            const provider = await connector?.getProvider()
            // passing false as second argument to disable Lit Protocol
            // https://github.com/OrbisWeb3/orbis-sdk/blob/master/index.js#L86
            await orbis.connect(provider, false)
        }

        return isOrbisConnected
    }

    const updateProfile = async (profile: PonProfile) => {
        const orbisProfileData: Profile = {
            cover: '',
            description: profile.description,
            pfp: '',
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

    return { connect, profile, updateProfile }
}
