import { HStack, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { IconType } from "react-icons";

import useLightDark from "@/hooks/useLightDark";

interface Props {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
}

function SidebarItem({ href, icon, label, onClick }: Props) {
  const { lightDark } = useLightDark();

  return (
    <HStack
      key={href}
      as={NextLink}
      href={href}
      gap={2}
      w="full"
      py={2}
      _hover={{
        color: lightDark("twitter.400", "twitter.600"),
        borderRadius: "md",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Icon fontSize="xl" as={icon} />
      <Text>{label}</Text>
    </HStack>
  );
}
export default SidebarItem;
