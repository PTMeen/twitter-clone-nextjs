import CommentForm from "@/components/CommentForm";
import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import CommentsFeed from "@/components/comment/CommentsFeed";
import PostItem from "@/components/post/PostItem";
import usePost from "@/hooks/usePost";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SinglePostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const {
    data: post,
    isLoading,
    mutate: mutatePost,
  } = usePost(postId as string);

  if (isLoading || !post) {
    return <PageSpinner />;
  }

  return (
    <>
      <Header title={`${post?.user?.name}'s Tweet`} />
      <Box py={6} borderBottomWidth={1}>
        <PostItem post={post} />
      </Box>
      <CommentForm postId={post.id} mutatePost={mutatePost} />
      <CommentsFeed comments={post.comments} />
    </>
  );
}
export default SinglePostPage;
