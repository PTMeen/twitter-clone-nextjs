import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

import { PostItem } from "@/types/post";

interface Props {
  post: PostItem;
}

function PostItem({ post }: Props) {
  const postedAt = formatDistanceToNowStrict(new Date(post.createdAt));

  return (
    <Box>
      <HStack align="start">
        <Avatar src={post.user.profileImg || "/default-avatar.jpg"} />
        <Box>
          <HStack>
            <Text>{post.user.name}</Text>
            <Text color="gray.500">@{post.user.username}</Text>
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
