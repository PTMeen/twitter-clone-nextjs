import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import PostFeed from "@/components/post/PostFeed";
import Bio from "@/components/profile/Bio";
import useUserPosts from "@/hooks/useUserPosts";
import useUsers from "@/hooks/useUsers";
import { useRouter } from "next/router";

function UserPage() {
  const router = useRouter();
  const { userId } = router.query;

  const { data, isLoading, mutate: mutateUser } = useUsers(userId as string);
  const { data: userPosts = [] } = useUserPosts(userId as string);

  if (isLoading) {
    return <PageSpinner />;
  }

  const user = data[0];

  return (
    <>
      <Header showBackArrow title={user.name} />
      <Bio user={user} mutateUser={mutateUser} />
      <PostFeed posts={userPosts} />
    </>
  );
}
export default UserPage;
