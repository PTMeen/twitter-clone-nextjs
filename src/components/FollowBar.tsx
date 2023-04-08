import useUsers from "@/hooks/useUsers";
import { Box, Card, Heading, Spinner } from "@chakra-ui/react";
import FollowBarItem from "./FollowBarItem";
import useCurrentUser from "@/hooks/useCurrentUser";

function FollowBar() {
  const { data = [], isLoading } = useUsers();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUser();
  const users = data.filter((item) => item.id !== currentUser?.id);

  if (isLoading || isCurrentUserLoading) {
    return (
      <Card
        mx={1}
        p={2}
        minH={500}
        shadow="md"
        display="flex"
        justify="center"
        alignItems="center"
      >
        <Spinner color="twitter.500" size="xl" />
      </Card>
    );
  }

  return (
    <Box px={4}>
      <Card mx={1} p={2} minH={500} shadow="md">
        <Box display="flex" flexDir="column" justifyContent="stretch">
          <Box mb={6}>
            <Heading as="h2" size="md" textAlign="left">
              Who to follow?
            </Heading>
          </Box>
          <Box justifySelf="stretch">
            {users.map((user) => (
              <Box key={user.id} mb={4}>
                <FollowBarItem user={user} />
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
export default FollowBar;
