import {
  Box,
  Avatar,
  Button,
  chakra,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsCalendarEvent } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";

import useLightDark from "@/hooks/useLightDark";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

function Bio() {
  const { lightDark } = useLightDark();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  if (!currentUser) {
    router.back();
    return null;
  }

  const joinedDate = formatDistanceToNowStrict(new Date(currentUser.createdAt));

  return (
    <Box>
      <Box
        h={200}
        bgColor={lightDark("gray.300", "gray.700")}
        position="relative"
      >
        <Avatar
          pos="absolute"
          left={5}
          bottom={0}
          mb="-50px"
          size="2xl"
          name="Meen"
          src={"/default-avatar.jpg"}
          borderWidth={3}
        />
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
        >
          EDIT
        </chakra.button>
      </Box>

      <Box mt={20} px={5}>
        <Box mb={6}>
          <Heading as="h1" size="xl">
            {currentUser?.name}
          </Heading>
          <Text fontSize="sm">@{currentUser?.username}</Text>
        </Box>
        {currentUser.bio && (
          <Box>
            <Text>Bio goes here</Text>
          </Box>
        )}
        <HStack gap={4}>
          <HStack>
            <BsCalendarEvent />
            <Text>Joined {joinedDate}</Text>
          </HStack>
          <Text>{currentUser.followingIds.length} followings</Text>
          <Text>{currentUser.followerIds.length} followers</Text>
        </HStack>
      </Box>
    </Box>
  );
}
export default Bio;
