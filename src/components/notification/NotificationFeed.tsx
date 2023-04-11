import { NotificationItem as NotificationItemType } from "@/types/notification";
import { Box, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: NotificationItemType[];
}

function NotificationFeed({ notifications }: Props) {
  if (!notifications.length) {
    return (
      <Box mt={8}>
        <Text textAlign="center">Nothing happend yet.</Text>
      </Box>
    );
  }

  return (
    <Box pt={8}>
      <Stack direction="column" spacing={4} divider={<StackDivider />}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </Stack>
    </Box>
  );
}
export default NotificationFeed;
