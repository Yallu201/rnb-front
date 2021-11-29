import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { Stack } from '@chakra-ui/layout';
import { useRef } from 'react';

const RegisterAccountDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button
        ref={btnRef}
        width="100%"
        size="lg"
        className="mt-8"
        onClick={onOpen}
      >
        회원가입
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent boxSize="lg" className="container mx-auto p-4 flex">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="3px">
            Create your account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={5}>
              <Input id="username" placeholder="아이디" size="md" />
              <Input id="password" placeholder="비밀번호" size="md" />
              <Input id="email" placeholder="이메일" size="md" />
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue">가입</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RegisterAccountDrawer;
