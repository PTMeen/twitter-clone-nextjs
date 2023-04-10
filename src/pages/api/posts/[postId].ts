import { getPostById } from "@/controllers/post";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return getPostById(req, res);
  }

  res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
