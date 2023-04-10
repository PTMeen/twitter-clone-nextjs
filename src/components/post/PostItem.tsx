import { MouseEvent } from "react";
import { Avatar, Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

import { PostItem } from "@/types/post";
import { useRouter } from "next/router";
import useMyToast from "@/hooks/useMyToast";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  post: PostItem;
}

function PostItem({ post }: Props) {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const myToast = useMyToast();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(post.id);

  const goToUser = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/users/${post.userId}`);
  };

  const goToSinglePostpage = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/posts/${post.id}`);
  };

  const postedAt = formatDistanceToNowStrict(new Date(post.createdAt));

  const handleLike = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    try {
      await axios.patch("/api/posts/like", { postId: post.id });
      console.log("Hello");

      mutatePost();
      mutatePosts();
    } catch (error) {
      myToast("Error", "Something went wrong", "error");
    }
  };

  const isLiked = post.likeIds.includes(currentUser?.id as string);

  return (
    <Box px={3} onClick={goToSinglePostpage} cursor="pointer">
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
          color={isLiked ? "red.500" : undefined}
          onClick={handleLike}
        >
          {post.likeIds.length}
        </Button>
      </Box>
    </Box>
  );
}
export default PostItem;
