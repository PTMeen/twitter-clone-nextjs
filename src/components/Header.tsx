import { Box, HStack, Heading, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TiThMenuOutline } from "react-icons/ti";

import useLightDark from "@/hooks/useLightDark";
import useNavigationDrawer from "@/hooks/useNavigationDrawer";

interface Props {
  title?: string;
  showBackArrow?: boolean;
}

function Header({ title, showBackArrow = true }: Props) {
  const { lightDark } = useLightDark();
  const { open } = useNavigationDrawer();

  const router = useRouter();
  const goBack = () => router.back();

  return (
    <Box
      borderBottomWidth={{ base: 0, md: 1 }}
      borderBottomColor={lightDark("gray.200", "gray.700")}
      pb={4}
      px={{ base: 0, md: 4 }}
    >
      <HStack gap={3} alignItems="center">
        {showBackArrow && (
          <Box>
            <IconButton
              onClick={goBack}
              aria-label="Go back"
              size={"lg"}
              icon={<AiOutlineArrowLeft size={20} />}
              variant="ghost"
            />
          </Box>
        )}
        {!!title && (
          <Heading as="h1" size="lg">
            {title}
          </Heading>
        )}
        <HStack
          flexGrow={1}
          justifyContent="end"
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            size="lg"
            variant="ghost"
            icon={<TiThMenuOutline size={20} />}
            aria-label="open menu"
            isRound
            _hover={{ color: lightDark("twitter.400", "twitter.600") }}
            onClick={open}
          />
        </HStack>
      </HStack>
    </Box>
  );
}
export default Header;
