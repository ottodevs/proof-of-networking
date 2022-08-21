import {
  Stack,
} from '@chakra-ui/react';
import ListItem from './ListItem';

export default function List({ data }:any) {
    return (
      <Stack>
        {data.map((item:any) => <ListItem key={item.title} {...item} />)}
      </Stack>
    );
}
