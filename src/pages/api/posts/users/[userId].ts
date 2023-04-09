import { getUserPosts } from "@/controllers/post";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return getUserPosts(req, res);
  }

  return res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
