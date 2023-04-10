import { useState, FormEvent } from "react";
import { Avatar, Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { KeyedMutator } from "swr";

import useCurrentUser from "@/hooks/useCurrentUser";
import useMyToast from "@/hooks/useMyToast";
import usePosts from "@/hooks/usePosts";

interface Props {
  postId: string;
  mutatePost: KeyedMutator<any>;
}

function CommentForm({ postId, mutatePost }: Props) {
  const { data: currentUser } = useCurrentUser();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const myToast = useMyToast();
  const { mutate: mutatePosts } = usePosts();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || !currentUser) return;

    setIsLoading(true);
    axios
      .post("/api/comments", {
        postId,
        userId: currentUser.id,
        content: comment,
      })
      .then((response) => {
        mutatePost();
        myToast("Success", response.data?.msg, "success");
        mutatePosts();
        setComment("");
      })
      .catch((error) => myToast("Error", error?.response?.data?.msg, "error"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Box p={4} as="form" onSubmit={handleSubmit}>
      <HStack alignItems="start">
        <Avatar src={currentUser?.profileImg || "/default-avatar.jpg"} />
        <Box flexGrow={1}>
          <HStack>
            <Text>{currentUser?.name}</Text>
            <Text color="gray.500">@{currentUser?.username}</Text>
          </HStack>
          <HStack mt={3} gap={2}>
            <Input
              w="full"
              variant="flushed"
              placeholder="leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              colorScheme="twitter"
              variant="outline"
              type="submit"
              isDisabled={!comment || isLoading}
              isLoading={isLoading}
            >
              comment
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}
export default CommentForm;
