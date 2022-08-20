declare module '@orbisclub/orbis-sdk' {
    export interface Profile {
        pfp: string
        username: string
        description: string
        cover: string
        data?: {
            twitter?: string
        }
    }

    export interface Metadata {
        chain: string
        address: string
        ensName?: any
    }

    export interface Nonces {
        global: number
        mainnet: number
        polygon: number
        arbitrum: number
    }

    export interface Details {
        did: string
        profile: Profile
        metadata: Metadata
        nonces: Nonces
        a_r: number
    }

    export interface OrbisDid {
        address: string
        count_followers: number
        count_following: number
        details: Details
        did: string
        last_activity_timestamp: number
        timestamp: number
        username: string
    }
}
