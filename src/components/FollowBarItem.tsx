import useLightDark from "@/hooks/useLightDark";
import { Avatar, HStack, Box, Text, Card } from "@chakra-ui/react";
import { User } from "@prisma/client";

interface Props {
  user: User;
}

function FollowBarItem({ user }: Props) {
  const { lightDark } = useLightDark();

  return (
    <Card variant="outline" py={1} px={2} _hover={{ cursor: "pointer" }}>
      <HStack>
        <Avatar
          name={user.name}
          src={user?.profileImg || "/default-avatar.jpg"}
          size="sm"
        />
        <Box>
          <Text fontSize="sm">{user.name}</Text>
          <Text fontSize="xs" color="gray.500">
            @{user.username}
          </Text>
        </Box>
      </HStack>
    </Card>
  );
}
export default FollowBarItem;
