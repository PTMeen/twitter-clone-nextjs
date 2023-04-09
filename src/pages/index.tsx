import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/post/PostFeed";
import usePosts from "@/hooks/usePosts";
import { Box } from "@chakra-ui/react";

function HomePage() {
  const { data: posts = [] } = usePosts();

  return (
    <>
      <Header title="Home" showBackArrow={false} />
      <Form />
      <PostFeed posts={posts} />
    </>
  );
}
export default HomePage;
