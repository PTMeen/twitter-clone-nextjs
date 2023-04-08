import { Box, Heading } from "@chakra-ui/react";

import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import Bio from "@/components/profile/Bio";
import useCurrentUser from "@/hooks/useCurrentUser";

function profile() {
  const { data: currentUser, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <Box h="100%" display="flex" justifyContent="center" alignItems="center">
        <Heading>{error?.response?.data?.msg}</Heading>
      </Box>
    );
  }

  return (
    <>
      <Header title="Profile" />
      <Bio user={currentUser!} isMyProfile />
    </>
  );
}
export default profile;
