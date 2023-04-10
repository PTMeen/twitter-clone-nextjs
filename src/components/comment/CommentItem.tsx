import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Comment } from "@prisma/client";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { formatDistanceToNowStrict } from "date-fns";

interface Props {
  profileImg: string | null | undefined;
  content: string;
  name: string;
  username: string;
  userId: string;
  createdAt: string;
}

function CommentIte({
  profileImg,
  content,
  createdAt,
  name,
  userId,
  username,
}: Props) {
  const router = useRouter();

  const goToUser = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/users/${userId}`);
  };

  const commentedAt = formatDistanceToNowStrict(new Date(createdAt));

  return (
    <HStack align="start">
      <Avatar
        cursor="pointer"
        onClick={goToUser}
        src={profileImg || "/default-avatar.jpg"}
      />
      <Box>
        <HStack>
          <Text
            onClick={goToUser}
            _hover={{ color: "twitter.500" }}
            cursor="pointer"
          >
            {name}
          </Text>
          <Text
            onClick={goToUser}
            cursor="pointer"
            _hover={{
              textDecor: "underline",
            }}
            color="gray.500"
          >
            @{username}
          </Text>
          <Text color="gray.500">- {commentedAt} ago</Text>
        </HStack>
        <Text>{content}</Text>
      </Box>
    </HStack>
  );
}
export default CommentIte;
