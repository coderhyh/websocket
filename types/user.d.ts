export interface FriendListMsg {
  msg: string;
  name: string;
  isMe: boolean;
  date: string;
  type: "image" | "text";
  userId: string;
}

export interface UserList {
  userId: string;
  userName?: string;
}

export interface UserInfo {
  code: number
  msg: string
  userName: string
  userId: string
  avatar: string
  token: string
}