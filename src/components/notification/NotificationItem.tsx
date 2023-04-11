import { NotificationType } from "@prisma/client";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { NotificationItem as NotificationItemType } from "@/types/notification";

interface Props {
  notification: NotificationItemType;
}

const messageMap: Record<NotificationType, string> = {
  FOLLOWED: "start follow you",
  UNFOLLOWED: "has stoped follow you",
  LIKED: "likes your post",
  UNLIKED: "unlikes your post",
  NEWPOST: "just tweet new post",
};

function NotificationItem({ notification }: Props) {
  const router = useRouter();
  const goToUser = () => {
    router.push(`/users/${notification.userId}`);
  };

  return (
    <Box px={4}>
      <HStack>
        <Avatar
          src={notification.user.profileImg || "/default-avatar.jpg"}
          _hover={{ cursor: "pointer" }}
          onClick={goToUser}
        />
        <Text>
          <Box
            ml={4}
            as="span"
            color="twitter.500"
            cursor="pointer"
            _hover={{ textDecor: "underline" }}
            onClick={goToUser}
          >
            {notification.user.name}
          </Box>{" "}
          {messageMap[notification.type]}
        </Text>
      </HStack>
    </Box>
  );
}
export default NotificationItem;
