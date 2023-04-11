import { Box, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

function NotFoundPage() {
  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <Heading>Page not found</Heading>
        <Link mt={10} as={NextLink} href="/" color="twitter.500">
          Go Home
        </Link>
      </Box>
    </Box>
  );
}
export default NotFoundPage;
