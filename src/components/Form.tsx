import { ChangeEvent, useState, FormEvent } from "react";
import { Avatar, Box, Button, HStack, Text, Textarea } from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLightDark from "@/hooks/useLightDark";
import useMyToast from "@/hooks/useMyToast";
import usePosts from "@/hooks/usePosts";

interface Props {
  isComment?: boolean;
}

function Form({ isComment }: Props) {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { lightDark } = useLightDark();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const myToast = useMyToast();

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length > 300) {
      return myToast("Error", "your post excced 300 characters", "error");
    }

    if (isComment) {
      // Handle create comment
      return;
    }

    // create new post
    if (!content) return;
    setIsLoading(true);
    axios
      .post("/api/posts", { content })
      .then(({ data }) => {
        mutatePosts();
        myToast("Success", data?.msg, "success");
        setContent("");
      })
      .catch((error) => {
        myToast("Error", error?.response?.data?.msg, "error");
      })
      .finally(() => setIsLoading(false));
  };

  if (!currentUser) return null;

  return (
    <Box borderBottomWidth={1} borderRadius="none" p={4}>
      <HStack gap={3}>
        <Avatar
          size="lg"
          src={currentUser?.profileImg || "/default-avatar.jpg"}
          as={Link}
          href="/profile"
          cursor="pointer"
        />
        <Box>
          <Text fontWeight="semibold">{currentUser.name}</Text>
          <Text
            fontSize="sm"
            color="gray.500"
            as={Link}
            href="/profile"
            cursor="pointer"
            _hover={{ textDecor: "underline" }}
          >
            @{currentUser.username}
          </Text>
        </Box>
      </HStack>
      <Box as="form" onSubmit={handleSubmit}>
        <Text
          textAlign="right"
          color={content.length > 300 ? "red.500" : "gray.400"}
          mr={1}
          mb={1}
        >
          {content.length} / 300
        </Text>
        <Textarea
          id="tweet-textarea"
          borderRadius="md"
          variant="filled"
          focusBorderColor={lightDark("twitter.300", "twitter.800")}
          size="sm"
          placeholder="Tweet something..."
          value={content}
          onChange={handleContentChange}
          disabled={isLoading}
        />
        <Box mt={4} textAlign="right">
          <Button
            colorScheme="twitter"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isComment ? "Comment" : "Tweet"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Form;
