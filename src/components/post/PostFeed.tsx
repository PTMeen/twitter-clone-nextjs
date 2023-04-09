import usePosts from "@/hooks/usePosts";
import { Box, StackDivider, Text, VStack, Stack } from "@chakra-ui/react";
import PostItem from "./PostItem";
import { PostItem as PostItemType } from "@/types/post";

interface Props {
  posts: PostItemType[];
}

function PostFeed({ posts }: Props) {
  return (
    <Box px={3} mt={6}>
      <Stack direction="column" spacing={6} divider={<StackDivider />}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Stack>
    </Box>
  );
}
export default PostFeed;
