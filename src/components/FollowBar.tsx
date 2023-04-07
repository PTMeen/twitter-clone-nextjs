import useUsers from "@/hooks/useUsers";
import { Box, Card, CardHeader, Heading, Text, VStack } from "@chakra-ui/react";
import FollowBarItem from "./FollowBarItem";

function FollowBar() {
  const { data: users = [], isLoading } = useUsers();
  console.log({ users });

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
