import { useContext } from 'react'
import { OrbisContext } from '~/contexts/OrbisContext'

export const useOrbis = () => {
    const orbis = useContext(OrbisContext)

    if (!orbis) {
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    return orbis
}
