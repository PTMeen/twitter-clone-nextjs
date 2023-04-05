import { Button } from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";

function TweetBtn() {
  return (
    <Button
      colorScheme="twitter"
      w="full"
      borderRadius="full"
      leftIcon={<FiFeather />}
    >
      Tweet
    </Button>
  );
}
export default TweetBtn;
