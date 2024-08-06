import { authorizePostRequest, postRequest } from "api";
import { IChapaPaymentResponse, SubscriptionType } from "models/payment";

export const chapaPaymentApi = async (token: string) => {
  return postRequest<IChapaPaymentResponse>(
    `payments/chapa?token=${token}`,
    {}
  );
};

export const vipChapaPaymentApi = async (
  userId: string,
  subscriptionType: SubscriptionType
) => {
  return postRequest<IChapaPaymentResponse>(`payments/vip/chapa`, {
    userId,
    subscriptionType,
  });
};

export const boostChapaPaymentApi = async (
  userId: string,
  boost: number,
  token: string
) => {
  return authorizePostRequest<IChapaPaymentResponse>(
    `payments/boost/chapa`,
    {
      userId,
      boost,
    },
    token
  );
};

export const withdrawChapaPaymentApi = async (userId: string, coin: number) => {
  return postRequest<IChapaPaymentResponse>(`payments/withdraw/chapa`, {
    userId,
    coin,
  });
};
