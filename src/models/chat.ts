export interface IChatUser {
  _id: string;
  image: string;
  name: string;
  is_online: boolean;
  last_seen: string;
}

export interface IChat {
  seen: boolean;
  receiver: IChatUser;
  sender: IChatUser;
  createdAt: string;
  updatedAt: string;
  message: string;
  anonymiseUserId?: string;
}

export interface IChatsResponse {
  data: IChat[];
  limit: number;
  offset: number;
  total: number;
  user: IChatUser;
  receiver: IChatUser;
}

export interface IChatData extends IChatsResponse {
  loading: boolean;
}

export interface IPagination {
  limit: number;
  offset: number;
  total: number;
  loading: boolean;
}

export interface ISendMessageResponse {
  success: true;
  data: IChat;
}

export interface IChatList {
  _id: string;
  image: string;
  name: string;
  lastMessageTime: string;
  anonymiseUserId?: string;
}
