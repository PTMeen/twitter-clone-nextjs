import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import PasswordField from "../PasswordField";
import useRegisterModal from "@/hooks/useRegisterModa";
import useMyToast from "@/hooks/useMyToast";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";

const initialFormData = {
  email: "",
  password: "",
};

function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const myToast = useMyToast();
  const router = useRouter();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return myToast(
        "Missing data",
        "Make sure all the fields are filled",
        "error"
      );
    }

    setIsLoading(true);
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((result) => {
      if (!result?.ok) {
        setIsLoading(false);
        return myToast("Login failed", "Invalid credentials", "error");
      }
      setIsLoading(false);
      myToast("Login success", "Welcome back!", "success");
      closeModal();
      mutateCurrentUser();
    });
  };

  const goToRegisterForm = () => {
    loginModal.close();
    setFormData(initialFormData);
    registerModal.open();
  };

  const closeModal = () => {
    setFormData(initialFormData);
    loginModal.close();
  };

  return (
    <Modal isOpen={loginModal.isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent w="500px" maxW="90%" as="form" onSubmit={handleSubmit}>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl my={3} isRequired>
            <FormLabel>Email </FormLabel>
            <Input
              autoFocus
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <PasswordField
              name="password"
              value={formData.password}
              id="password"
              onChange={handleFormDataChange}
            />
          </FormControl>
          <Box mt={5}>
            <Text>
              Don't have an account yet?{" "}
              <Text
                as="span"
                color="twitter.500"
                _hover={{ cursor: "pointer" }}
                onClick={goToRegisterForm}
              >
                Create One!
              </Text>
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            colorScheme="twitter"
            mr={3}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default LoginModal;
