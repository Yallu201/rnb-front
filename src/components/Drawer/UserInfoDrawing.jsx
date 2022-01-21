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
import { useHistory } from 'react-router';

const UserInfoDrawing = ({isLogin}) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const onClick = () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      history.push('/login');
      return;
    }
    onOpen();
  };
  return (
  <>
        <IconButton size="md" color="current" variant="ghost" icon={<LockIcon/>} onClick={onClick}/>
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