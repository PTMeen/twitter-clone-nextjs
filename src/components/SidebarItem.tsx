import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

import useLightDark from "@/hooks/useLightDark";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

interface Props {
  href: string;
  label: string;
  icon: IconType;
  auth?: boolean;
}

function SidebarItem({ href, icon, label, auth }: Props) {
  const { lightDark } = useLightDark();
  const { status } = useSession();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleClick = () => {
    if (auth && status !== "authenticated") {
      return loginModal.open();
    }

    router.push(href);
  };

  return (
    <HStack
      onClick={handleClick}
      gap={2}
      w="full"
      py={2}
      _hover={{
        color: lightDark("twitter.400", "twitter.600"),
        borderRadius: "md",
        cursor: "pointer",
      }}
    >
      <Icon fontSize="xl" as={icon} />
      <Text>{label}</Text>
    </HStack>
  );
}
export default SidebarItem;
