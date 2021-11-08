import React from 'react';
import { IconButton, useDisclosure, Stack, Box} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter, 사용하지 않은 Component
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { LockIcon } from '@chakra-ui/icons';

const UserInfoDrawing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
  <>
        <IconButton size="md" color="current" variant="ghost" icon={<LockIcon/>} onClick={onOpen}/>
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
              User Info
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  User Name : Admin <br/>
                  User Address : ...
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      </>
  );
};

export default UserInfoDrawing;