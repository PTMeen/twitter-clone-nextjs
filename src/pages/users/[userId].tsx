import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import Bio from "@/components/profile/Bio";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

function UserPage() {
  const router = useRouter();

  const { userId } = router.query;
  const { data, isLoading } = useUsers(userId as string);
  const { data: currentUser } = useCurrentUser();

  if (isLoading) {
    return <PageSpinner />;
  }

  const user = data[0];

  return (
    <>
      <Header showBackArrow title={user.name} />
      <Bio user={user} />
    </>
  );
}
export default UserPage;
