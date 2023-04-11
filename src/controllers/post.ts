import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "Post content requried" });
    }

    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    if (!currentUser.id) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    await prisma.post.create({
      data: {
        content,
        userId: currentUser.id,
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

const getPostById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;

  if (!postId || typeof postId !== "string") {
    return res.status(400).json({ msg: "Invalid post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
                id: true,
                profileImg: true,
              },
            },
          },
        },
        user: {
          select: {
            username: true,
            name: true,
            id: true,
            profileImg: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

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

const likeUnlikePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.body;
  const currentUser = await serverAuth(req, res);

  if (!postId || typeof postId !== "string") {
    return res.status(400).json({ msg: "Post ID requried" });
  }

  if (!currentUser) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const likeIds = post?.likeIds || [];
    let updatedLikeIds: string[] = [];

    if (likeIds.includes(currentUser.id)) {
      updatedLikeIds = likeIds.filter((item) => item !== currentUser.id);
      await prisma.notification.create({
        data: {
          userId: currentUser.id,
          receiver: post.userId,
          type: "UNLIKED",
        },
      });
    } else {
      updatedLikeIds.push(currentUser.id);
      await prisma.notification.create({
        data: {
          userId: currentUser.id,
          receiver: post.userId,
          type: "LIKED",
        },
      });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        likeIds: updatedLikeIds,
      },
    });

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export { createPost, getAllPost, getPostById, getUserPosts, likeUnlikePost };
