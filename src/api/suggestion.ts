import { authorizeGetRequest } from "api";
import { ISuggestionResponse } from "models/suggestion";

export const findSuggestionApi = async (token: string) => {
  return authorizeGetRequest<ISuggestionResponse>("suggestions/find", token);
};

export const likeSuggestionApi = async (id: string, token: string) => {
  return authorizeGetRequest<ISuggestionResponse>(
    `suggestions/${id}/like`,
    token
  );
};

export const dislikeSuggestionApi = async (id: string, token: string) => {
  return authorizeGetRequest<ISuggestionResponse>(
    `suggestions/${id}/dislike`,
    token
  );
};
