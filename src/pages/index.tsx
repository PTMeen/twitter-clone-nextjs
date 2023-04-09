import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/post/PostFeed";
import { Box } from "@chakra-ui/react";

function HomePage() {
  return (
    <>
      <Header title="Home" showBackArrow={false} />
      <Form />
      <PostFeed />
    </>
  );
}
export default HomePage;
