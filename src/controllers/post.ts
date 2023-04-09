import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "Post content requried" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.id) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    const newPost = await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },
    });

    return res.status(201).json({ msg: "New post created" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getAllPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImg: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getPostById = async (req: NextApiRequest, res: NextApiResponse) => {};

const getUserPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  try {
    if (!req.query.userId || typeof userId !== "string") {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImg: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(posts);
  } catch (error) {}
};

export { createPost, getAllPost, getPostById, getUserPosts };
