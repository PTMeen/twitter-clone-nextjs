import Form from "@/components/Form";
import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import PostFeed from "@/components/post/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

function HomePage() {
  const { data: posts = [] } = usePosts();
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Header title="Home" showBackArrow={false} />
      <Form />
      <PostFeed posts={posts} />
    </>
  );
}
export default HomePage;
