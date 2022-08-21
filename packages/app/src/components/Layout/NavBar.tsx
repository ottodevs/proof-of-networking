import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import { ToggleColorMode } from './ToggleColorMode'
import { NavLink } from './NavLink'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const NavBar = () => {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <HStack h={20} alignItems={'center'} justifyContent={'space-between'}>
                <Box style={{ fontWeight: '800', cursor: 'pointer' }}>
                    <NavLink route={'/'}>Proof of Networking</NavLink>
                </Box>
                <HStack>
                    <Box style={{ fontWeight: '800', cursor: 'pointer' }}>
                        <NavLink route={'/contacts'}>Contacts</NavLink>
                    </Box>
                    <Box style={{ fontWeight: '800', cursor: 'pointer' }}>
                        <NavLink route={'/profile'}>Profile</NavLink>
                    </Box>
                    <ToggleColorMode />
                </HStack>
            </HStack>
        </Box>
    )
}
