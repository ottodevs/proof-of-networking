import { Box, Editable, EditableInput, EditablePreview, HStack, Input } from '@chakra-ui/react'
import { EditableControls } from './EditableControls'

export const EditableField = ({
    value,
    width,
    isEdit,
}: {
    value: string | undefined
    width?: string
    isEdit: boolean
}) => {
    return (
        <Editable
            width={width || '100%'}
            textAlign='left'
            value={value}
            fontSize='md'
            fontWeight={400}
            isPreviewFocusable={false}
            minW={'100%'}>
            <HStack justifyContent={'space-between'} spacing={'.5'}>
                <EditablePreview h={'42px'} />
                <Input as={EditableInput} h={'42px'} />
                {isEdit && <EditableControls />}
            </HStack>
        </Editable>
    )
}
