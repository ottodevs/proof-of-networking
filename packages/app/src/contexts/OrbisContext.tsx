import { Orbis } from '@orbisclub/orbis-sdk'
import React, { createContext, ReactNode } from 'react'

const OrbisContext = createContext<typeof Orbis | undefined>(undefined)

// orbis outside the component avoids being re-init on each render
const orbis = new Orbis()

const OrbisProvider = ({ children }: { children: ReactNode }) => {
    return <OrbisContext.Provider value={orbis}>{children}</OrbisContext.Provider>
}

export { OrbisProvider, OrbisContext }
