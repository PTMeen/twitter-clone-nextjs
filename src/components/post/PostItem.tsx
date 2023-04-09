import { MouseEvent } from "react";
import Link from "next/link";
import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

import { PostItem } from "@/types/post";
import { useRouter } from "next/router";

interface Props {
  post: PostItem;
}

function PostItem({ post }: Props) {
  const router = useRouter();

  const goToUser = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/users/${post.userId}`);
  };

  const goToSinglePostpage = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/posts/${post.id}`);
  };

  const postedAt = formatDistanceToNowStrict(new Date(post.createdAt));

  return (
    <Box onClick={goToSinglePostpage} cursor="pointer">
      <HStack align="start">
        <Avatar
          cursor="pointer"
          onClick={goToUser}
          src={post.user.profileImg || "/default-avatar.jpg"}
        />
        <Box>
          <HStack>
            <Text
              onClick={goToUser}
              _hover={{ color: "twitter.500" }}
              cursor="pointer"
            >
              {post.user.name}
            </Text>
            <Text
              onClick={goToUser}
              cursor="pointer"
              _hover={{
                textDecor: "underline",
              }}
              color="gray.500"
            >
              @{post.user.username}
            </Text>
            <Text color="gray.500">- {postedAt} ago</Text>
          </HStack>
          <Text>{post.content}</Text>
        </Box>
      </HStack>
      <Box pt={4} px={6}>
        <Button
          borderRadius="full"
          size="sm"
          aria-label="comment"
          leftIcon={<FaRegComment />}
        >
          {post.comments.length}
        </Button>
        <Button
          borderRadius="full"
          size="sm"
          ml={4}
          aria-label="like"
          leftIcon={<AiOutlineHeart />}
        >
          {post.likeIds.length}
        </Button>
      </Box>
    </Box>
  );
}
export default PostItem;
