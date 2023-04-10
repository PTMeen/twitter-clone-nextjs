import { Box, StackDivider, VStack } from "@chakra-ui/react";
import { Comment } from "@prisma/client";

import CommentItem from "./CommentItem";

interface Props {
  comments: Record<string, any>[];
}

function CommentsFeed({ comments }: Props) {
  return (
    <Box borderTopWidth={1}>
      <VStack alignItems="start" spacing={3} p={3} divider={<StackDivider />}>
        {comments.map((comment) => (
          <CommentItem
            profileImg={comment?.user?.profileImg}
            content={comment?.content}
            createdAt={comment?.createdAt}
            name={comment?.user?.name}
            userId={comment?.userId}
            username={comment?.user?.username}
            key={comment.id}
          />
        ))}
      </VStack>
    </Box>
  );
}
export default CommentsFeed;
