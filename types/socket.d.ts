export interface ServerToClientEvents {
  connectSuccess: (val: string) => void
  userCount: (userCount: number) => void
  sendMsg: (sendData: FriendListMsg) => void
  userList: (userList: UserList[]) => void
  contextmenu_avatar: (msg: '@AITE_NAME' | 'PAI_YI_PAI') => void
}

export interface ClientToServerEvents {
  disconnect: () => void
  sendMsg: (sendData: FriendListMsg, aiteTargets?: string[]) => void
  contextmenu_avatar: (options: { type: '@AITE_NAME' | 'PAI_YI_PAI', target: string, userName: string }) => void
}

export interface InterServerEvents {
}

export interface SocketData {
  userName: string
}

export interface FriendListMsg {
  msg: string
  name: string
  isMe: boolean
  date: string
  type: 'image' | 'text'
  userId: string
}

export interface UserList {
  userId: string
  userName?: string
}

export interface SocketType {
  userName: string
}