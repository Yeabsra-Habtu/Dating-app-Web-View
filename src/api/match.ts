import { authorizeGetRequest, getRequest } from "api";
import { IMatch } from "models/match";

export const getMatch = async (id: string) => {
  return getRequest<IMatch>(`matches/getAllMatches/${id}`);
};

export const mineMatchesApi = async (token: string) => {
  return authorizeGetRequest<IMatch[]>(`matches/mine`, token);
};
