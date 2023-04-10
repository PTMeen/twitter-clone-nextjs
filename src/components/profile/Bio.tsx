import Image from "next/image";
import { Box, Avatar, chakra, Heading, Text, HStack } from "@chakra-ui/react";
import { BsCalendarEvent } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@prisma/client";
import axios from "axios";
import { KeyedMutator } from "swr";

import useLightDark from "@/hooks/useLightDark";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import useMyToast from "@/hooks/useMyToast";
import useUsers from "@/hooks/useUsers";

interface Props {
  user: User;
  isMyProfile?: boolean;
  mutateUser?: KeyedMutator<any>;
}

function Bio({ user, isMyProfile, mutateUser }: Props) {
  const { lightDark } = useLightDark();
  const editProfileModal = useEditProfileModal();
  const myToast = useMyToast();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateUsers } = useUsers();

  const joinedDate =
    formatDistanceToNowStrict(new Date(user.createdAt)) + " " + "ago";

  const editProfile = () => {
    editProfileModal.open();
  };

  const followUnFollow = () => {
    const url = currentUser?.followingIds.includes(user.id)
      ? "/api/unfollow"
      : "/api/follow";

    axios
      .patch(url, { userId: user.id })
      .then(() => {
        if (mutateUser) {
          mutateUser();
        }
        mutateUsers();
        console.log("Yay!");
      })
      .catch((error) => {
        myToast("Errror", "Something went wrong", "error");
      });
  };

  return (
    <Box borderBottomWidth={1} pb={4}>
      <Box
        h={200}
        bgColor={lightDark("gray.300", "gray.700")}
        position="relative"
      >
        {user?.coverImg && <Image src={user.coverImg} alt="" fill />}
        <Avatar
          pos="absolute"
          left={5}
          bottom={0}
          mb="-50px"
          size="2xl"
          name="Meen"
          src={user?.profileImg || "/default-avatar.jpg"}
          borderWidth={3}
        />
        {isMyProfile ? (
          <chakra.button
            pos="absolute"
            bgColor={lightDark("gray.700", "gray.400")}
            bottom="-50px"
            right={5}
            color="white"
            py={2}
            px={6}
            borderRadius={"full"}
            transition={"0.3s"}
            _hover={{
              bgColor: "gray.500",
            }}
            onClick={editProfile}
          >
            Edit
          </chakra.button>
        ) : (
          <chakra.button
            pos="absolute"
            bgColor={lightDark("gray.700", "gray.400")}
            bottom="-50px"
            right={5}
            color="white"
            py={2}
            px={6}
            borderRadius={"full"}
            transition={"0.3s"}
            _hover={{
              bgColor: "gray.500",
            }}
            onClick={followUnFollow}
          >
            {currentUser?.followingIds.includes(user.id)
              ? "Unfollow"
              : "Follow"}
          </chakra.button>
        )}
      </Box>

      <Box mt={20} px={5}>
        <Box mb={6}>
          <Heading as="h1" size="xl">
            {user?.name}
          </Heading>
          <Text fontSize="sm">@{user?.username}</Text>
        </Box>
        {user.bio && (
          <Box mb={6}>
            <Text>{user.bio}</Text>
          </Box>
        )}
        <HStack gap={4}>
          <HStack>
            <BsCalendarEvent />
            <Text>Joined {joinedDate}</Text>
          </HStack>
          <Text>{user.followingIds.length} followings</Text>
          <Text>{user.followerIds.length} followers</Text>
        </HStack>
      </Box>
    </Box>
  );
}
export default Bio;
