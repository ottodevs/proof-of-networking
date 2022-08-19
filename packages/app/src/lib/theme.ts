import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
    // fonts: {
    //     heading: `'Silkscreen', cursive`,
    //     body: `'Silkscreen', cursive`,
    // },
}

export const theme = extendTheme({ config })
