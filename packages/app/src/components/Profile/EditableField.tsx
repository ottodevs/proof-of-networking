import { Box, Editable, EditableInput, EditablePreview, HStack, Input } from '@chakra-ui/react'
import { EditableControls } from './EditableControls'

export const EditableField = ({
    value,
    width,
    isEdit,
    onSubmit,
}: {
    value: string | undefined
    width?: string
    isEdit: boolean
    onSubmit?: (e: any) => void
}) => {
    return (
        <Editable
            width={width || '100%'}
            textAlign='left'
            defaultValue={value}
            placeholder={value}
            fontSize='md'
            fontWeight={400}
            isPreviewFocusable={false}
            onSubmit={onSubmit}
            minW={'100%'}>
            <HStack justifyContent={'space-between'} spacing={'.5'}>
                <EditablePreview h={'42px'} />
                <Input as={EditableInput} h={'42px'} />
                {isEdit && <EditableControls />}
            </HStack>
        </Editable>
    )
}
