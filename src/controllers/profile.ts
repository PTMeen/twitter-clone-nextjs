import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
});

import prisma from "@/lib/prismadb";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const updateProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).end();
  }

  const {
    name,
    bio,
    profileImgUrl: profileImg,
    coverImgUrl: coverImg,
  } = req.body;

  if (!name || !bio) {
    return res.status(400).json({ msg: "Missing profile data" });
  }

  const updatedUserInfo: any = { name, bio };

  // UPLOAD PROFILE IMAGE
  if (profileImg) {
    try {
      const { secure_url } = await cloudinary.uploader.upload(profileImg, {
        folder: "/twitter-clone/user-profile",
        public_id: session.user.email,
        overwrite: true,
      });
      updatedUserInfo.profileImg = secure_url;
    } catch (error) {
      return res.status(500).json({ msg: "Can not upload profile image" });
    }
  }

  // UPLOAD COVER IMAGE
  if (coverImg) {
    try {
      const { secure_url } = await cloudinary.uploader.upload(coverImg, {
        folder: "/twitter-clone/user-cover",
        public_id: session.user.email,
        overwrite: true,
      });
      updatedUserInfo.coverImg = secure_url;
    } catch (error) {
      return res.status(500).json({ msg: "Can not upload cover image" });
    }
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: updatedUserInfo,
    });

    return res.status(200).json({ msg: "Profile updated" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
