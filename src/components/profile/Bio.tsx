import Image from "next/image";
import { Box, Avatar, chakra, Heading, Text, HStack } from "@chakra-ui/react";
import { BsCalendarEvent } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@prisma/client";
import { KeyedMutator } from "swr";

import useLightDark from "@/hooks/useLightDark";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import useFollow from "@/hooks/useFollow";

interface Props {
  user: User;
  isMyProfile?: boolean;
}

function Bio({ user, isMyProfile }: Props) {
  const { lightDark } = useLightDark();
  const editProfileModal = useEditProfileModal();

  const { followUnfollow, isFollowing, isLoading } = useFollow(user.id);

  const joinedDate =
    formatDistanceToNowStrict(new Date(user.createdAt)) + " " + "ago";

  const editProfile = () => {
    editProfileModal.open();
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
            _disabled={{
              bgColor: lightDark("gray.500", "gray.600"),
            }}
            _hover={{
              bgColor: "gray.500",
            }}
            onClick={followUnfollow}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : isFollowing ? "Unfollow" : "Follow"}
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
