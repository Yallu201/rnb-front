import React from 'react';
import { IconButton, useDisclosure, Stack, Box, FormLabel, Input } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter, 사용하지 않은 Component
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';

const BookmarkDrawing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
  <>
        <IconButton size="md" variant="ghost" icon={<StarIcon/>} onClick={onOpen}/>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              <StarIcon/>
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="stockName">관심종목</FormLabel>
                  <Input
                    ref={firstField}
                    id="stockName"
                    placeholder="즐겨찾기 해둔 종목을 검색하세요!"
                  />
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </>
  );
};

export default BookmarkDrawing;