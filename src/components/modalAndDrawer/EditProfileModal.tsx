import { useState, useEffect, ChangeEvent } from "react";
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
  VStack,
  Textarea,
  Box,
  Avatar,
  IconButton,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { BsCameraFill, BsImage } from "react-icons/bs";
import Image from "next/image";

import useMyToast from "@/hooks/useMyToast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import useLightDark from "@/hooks/useLightDark";
import useImageFile from "@/hooks/useImageFile";

function EditProfileModal() {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const myToast = useMyToast();
  const editProfileModal = useEditProfileModal();
  const { lightDark } = useLightDark();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { fileUrl: profileImgUrl, handleFileChange: handleProfileImgChange } =
    useImageFile();

  const { fileUrl: coverImgUrl, handleFileChange: handleCoverImgChange } =
    useImageFile();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name) return;

    try {
      setIsLoading(true);
      await axios.patch("/api/profile", {
        name,
        bio,
        profileImgUrl,
        coverImgUrl,
      });
      mutateCurrentUser();
      editProfileModal.close();
      myToast("Success", "Profile updated", "success");
    } catch (error: any) {
      myToast("Error", error?.response?.data?.msg!, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (isLoading) return;
    editProfileModal.close();
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setBio(currentUser.bio || "");
    }
  }, [currentUser]);

  return (
    <Modal isOpen={editProfileModal.isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        w="500px"
        maxW="90%"
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box
          pos="absolute"
          w="full"
          h="150px"
          display="flex"
          justifyContent="center"
          bgColor={lightDark("gray.300", "gray.700")}
        >
          {(coverImgUrl || currentUser?.coverImg) && (
            <Image
              src={(coverImgUrl as string) || currentUser?.coverImg!}
              fill
              alt="cover image"
              style={{
                objectFit: "cover",
              }}
            />
          )}
          <Avatar
            size="xl"
            bottom="-100px"
            borderWidth={3}
            src={profileImgUrl || currentUser?.profileImg!}
          />
        </Box>
        <ModalHeader zIndex={2}>Edit Profile</ModalHeader>
        <ModalCloseButton disabled={isLoading} zIndex={2} />
        <ModalBody mt="150px">
          <VStack gap={2}>
            <HStack gap={6}>
              <Tooltip label="Select profile image" hasArrow>
                <IconButton
                  icon={<BsCameraFill />}
                  aria-label="Select profile image"
                  as="label"
                  htmlFor="profile-img-picker"
                  variant="outline"
                  isRound
                />
              </Tooltip>
              <input
                id="profile-img-picker"
                hidden
                accept="image/*"
                type="file"
                onChange={handleProfileImgChange}
              />
              <Tooltip label="Select cover image" hasArrow>
                <IconButton
                  icon={<BsImage />}
                  aria-label="Select cover image"
                  as="label"
                  htmlFor="cover-img-picker"
                  variant="outline"
                  isRound
                />
              </Tooltip>
              <input
                id="cover-img-picker"
                hidden
                accept="image/*"
                type="file"
                onChange={handleCoverImgChange}
              />
            </HStack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            colorScheme="twitter"
            mr={3}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default EditProfileModal;
