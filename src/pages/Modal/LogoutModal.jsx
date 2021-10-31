import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from "@chakra-ui/react"
import { useCallback, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from '../../modules/auth';

  const LogoutModal = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const { isOpen, onOpen, onClose } = useDisclosure();
      const finalRef = useRef();
      const onClickLogout = useCallback(() => {
        dispatch(logout());
        history.push('/');
      }, [history, dispatch]);
      return (
        <>
        <Button onClick={onOpen}>
        로그아웃
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>확인창</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                정말 로그아웃 하시겠습니까?
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
                </Button>
                <Button colorScheme="red" onClick={onClickLogout}>Logout</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
  }

export default LogoutModal;