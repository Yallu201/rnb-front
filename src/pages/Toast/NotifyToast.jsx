import { createStandaloneToast } from "@chakra-ui/toast";

const NotifyToast = ({ title, description, status }) => {
    const toast = createStandaloneToast();
    toast({
        title: title,
        description: description,
        status: status,
        duration: 5000,
        isClosable: true
    })

}

export default NotifyToast;