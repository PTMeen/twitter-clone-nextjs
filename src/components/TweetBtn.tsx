import { Button } from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";

import useLoginModal from "@/hooks/useLoginModal";
import useNavigationDrawer from "@/hooks/useNavigationDrawer";
import { useSession } from "next-auth/react";

function TweetBtn() {
  const { data: session } = useSession();
  const loginModal = useLoginModal();
  const navigationDrawer = useNavigationDrawer();

  const handleClick = () => {
    if (!session) {
      loginModal.open();
      return;
    }

    const tweetTextArea = document.getElementById("tweet-textarea")!;
    tweetTextArea.scrollIntoView({ behavior: "smooth" });
    tweetTextArea.focus();

    navigationDrawer.close();
  };

  return (
    <Button
      colorScheme="twitter"
      w="full"
      borderRadius="full"
      leftIcon={<FiFeather />}
      onClick={handleClick}
    >
      Tweet
    </Button>
  );
}
export default TweetBtn;
