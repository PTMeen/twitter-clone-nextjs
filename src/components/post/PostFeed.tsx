import usePosts from "@/hooks/usePosts";
import { Box, StackDivider, Text, VStack, Stack } from "@chakra-ui/react";
import PostItem from "./PostItem";

function PostFeed() {
  const { data: posts = [], isLoading } = usePosts();
  console.log(posts);

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
