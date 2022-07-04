export interface ServerToClientEvents {
  connectSuccess: (val: string) => void;
  userCount: (userCount: number) => void;
  sendMsg: (sendData: FriendListMsg) => void;
  userList: (userList: UserList[]) => void;
  contextmenu_avatar: (
    type: "@AITE_NAME" | "PAI_YI_PAI",
    options?: contextmenu_avatar_type
  ) => void;
  // inform_message: ()
}

export interface ClientToServerEvents {
  disconnect: () => void;
  sendMsg: (sendData: FriendListMsg, aiteTargets?: string[]) => void;
  contextmenu_avatar: (options: contextmenu_avatar_type) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userName: string;
}

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

export interface SocketType {
  userName: string;
}

export interface contextmenu_avatar_type {
  type: "@AITE_NAME" | "PAI_YI_PAI";
  receiveId: string;
  receiveName: string;
  launchName: string;
  launchId: string;
}
