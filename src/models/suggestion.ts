import { IUser } from "./user";

export enum SuggestionStatus {
  OUT_OF_COIN = "OUT_OF_COIN",
  SUGGESTION_FOUND = "SUGGESTION_FOUND",
  NOT_FOUND = "NOT_FOUND",
}

export interface ISuggestionResponse {
  status: SuggestionStatus;
  data: ISuggestionUser;
  message: string;
}

export interface ISuggestionUser extends IUser {
  gift: number;
}
