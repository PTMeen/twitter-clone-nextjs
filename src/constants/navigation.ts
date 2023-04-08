import { BiHome, BiUser } from "react-icons/bi";
import { MdOutlineNotifications } from "react-icons/md";
import { IconType } from "react-icons";

export type NavLink = {
  label: string;
  href: string;
  icon: IconType;
  auth?: boolean;
};

export const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: BiHome,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: BiUser,
    auth: true,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: MdOutlineNotifications,
    auth: true,
  },
];
