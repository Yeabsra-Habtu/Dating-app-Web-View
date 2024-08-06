import {
  authorizeGetRequest,
  deleteRequest,
  getRequest,
  postRequest,
} from "api";
import { IUser, IUserWithdrawResponse } from "models/user";

export const getUserByIdApi = async (id: string) => {
  return getRequest<IUser>(`users/${id}`);
};

export const findUserByIdApi = async (id: string, token: string) => {
  return authorizeGetRequest<IUser>(`users/${id}/profile`, token);
};

export const findUserWithdrawApi = async (id: string) => {
  return getRequest<IUserWithdrawResponse>(`users/${id}/withdraw`);
};

export const deleteUserPhoto = async (id: string, url: string) => {
  return deleteRequest<string>(`users/${id}/delete/${url}`);
};

export const updateQuestion = async (id: string, data: any) => {
  return postRequest<string>(`users/question/${id}`, data);
};

export const generateChatTokenApi = async (id: string) => {
  return getRequest<{ token: string }>(`users/generateToken/${id}`);
};
