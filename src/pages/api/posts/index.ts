import { NextApiHandler } from "next";

import { createPost, getAllPost } from "@/controllers/post";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return getAllPost(req, res);
  }

  if (req.method === "POST") {
    return createPost(req, res);
  }

  res.status(405).json({ msg: "Nethod not allowed" });
};
export default handler;
