import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: true,
    },
    fonts: {
        heading: `Silkscreen, sans-serif`,
        body: `Silkscreen, sans-serif`,
        h4: `Silkscreen, sans-serif`,
    },
})
