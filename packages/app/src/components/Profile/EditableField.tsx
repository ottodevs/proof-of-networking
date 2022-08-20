import { Box, Editable, EditableInput, EditablePreview, HStack, Input } from '@chakra-ui/react'
import { EditableControls } from './EditableControls'

export const EditableField = ({ value }: { value: string | undefined }) => {
    return (
        <Editable textAlign='left' value={value} fontSize='xl' isPreviewFocusable={false} minW={'100%'}>
            <HStack justifyContent={'space-between'} spacing={'.5'}>
                <EditablePreview h={'42px'} />
                <Input as={EditableInput} h={'42px'} />
                <EditableControls />
            </HStack>
        </Editable>
    )
}
