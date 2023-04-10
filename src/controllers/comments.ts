import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

export const createComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { content, postId, userId } = req.body;

  if (!content || !userId || !postId) {
    return res.status(400).json({ msg: "Invalid comment data" });
  }

  try {
    const newComment = await prisma.comment.create({
      data: { content, userId, postId },
    });
    return res.status(201).json({ msg: "New comment created" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
