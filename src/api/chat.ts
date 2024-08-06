import { authorizeGetRequest, getRequest } from "api";
import { IChatList, IChatsResponse } from "models/chat";

export const chatUserApi = (
  userId: string,
  receiverId: string,
  limit: number,
  offset: number
) => {
  return authorizeGetRequest<IChatsResponse>(
    `chats/${userId}/${receiverId}?limit=${limit}&offset=${offset}`,
    receiverId
  );
};

export const getAllChats = async (id: string) => {
  return getRequest<IChatList[]>(`chats/getAllChats/${id}`);
};

export const mineChatsApi = async (token: string) => {
  return authorizeGetRequest<IChatList[]>(`chats/mine`, token);
};

export const userMessagesApi = async (
  id: string,
  limit: number,
  offset: number,
  token: string
) => {
  return authorizeGetRequest<IChatsResponse>(
    `chats/${id}?limit=${limit}&offset=${offset}`,
    token
  );
};
