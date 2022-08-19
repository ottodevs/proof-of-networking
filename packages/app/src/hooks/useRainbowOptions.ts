import { useColorModeValue } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { chains } from '~/lib'

type Blurs = 'large' | 'small' | 'none'

export const useRainbowOptions = () => {
    const themeOptions = { overlayBlur: 'large' as Blurs }
    const theme = useColorModeValue(lightTheme(themeOptions), darkTheme(themeOptions))

    const rainbowOptions = {
        appName: 'Web3 Patreon',
        chains,
        // coolMode: true, // TODO: too much coolness for now?
        theme,
        //initialChain: // TODO: get from a hook, changing to current selected chain if valid
    }

    return rainbowOptions
}
