import { postRequest } from "api";
import { ILoginResponse } from "models/auth";

export const loginApi = async (telegramData: string) => {
  return postRequest<ILoginResponse>(
    "auth/telegram/login",
    {},
    { "X-telegram-data": telegramData }
  );
};
