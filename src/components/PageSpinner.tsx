import { Box, Spinner } from "@chakra-ui/react";

function PageSpinner() {
  return (
    <Box h="100%" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" color="twitter.500" />
    </Box>
  );
}
export default PageSpinner;
