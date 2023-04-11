import { Notification } from "@prisma/client";
import { UserThumbnail } from "./user";

export type NotificationItem = Notification & { user: UserThumbnail };
