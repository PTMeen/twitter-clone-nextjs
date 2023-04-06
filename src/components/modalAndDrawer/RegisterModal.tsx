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
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/hooks/useRegisterModa";
import PasswordField from "../PasswordField";
import useLoginModal from "@/hooks/useLoginModal";
import useMyToast from "@/hooks/useMyToast";
import useCurrentUser from "@/hooks/useCurrentUser";

const initialFormData = {
  email: "",
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const myToast = useMyToast();

  const [formData, setFormdata] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { confirmPassword, email, name, password, username } = formData;
    if (!confirmPassword || !email || !name || !password || !username) {
      return myToast(
        "Missing data",
        "Make sure all the fields are filled",
        "error"
      );
    }

    if (password !== confirmPassword) {
      return myToast("Register failed", "Passwords doesn't match", "error");
    }

    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        email,
        name,
        username,
        password,
      });

      myToast("Success", "Account created", "success");

      signIn("credentials", { email, password, redirect: false }).then(
        (result) => {
          if (result?.ok) {
            closeModal();
            mutateCurrentUser();
          }
        }
      );
    } catch (error: any) {
      myToast("Error", error?.response?.data?.msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLoginForm = () => {
    registerModal.close();
    setFormdata(initialFormData);
    loginModal.open();
  };

  const closeModal = () => {
    setFormdata(initialFormData);
    registerModal.close();
  };

  return (
    <Modal isOpen={registerModal.isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent
        w="500px"
        maxW="90%"
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ModalHeader>Register</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <VStack gap={2}>
            <FormControl isRequired>
              <FormLabel>Email </FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <PasswordField
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
              />
              <FormHelperText>
                Please make sure confirm password match your password.
              </FormHelperText>
            </FormControl>
          </VStack>
          <Box mt={5}>
            <Text>
              Not your first time on Twitter?{" "}
              <Text
                as="span"
                color="twitter.500"
                _hover={{ cursor: "pointer" }}
                onClick={goToLoginForm}
              >
                Login
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
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default RegisterModal;
