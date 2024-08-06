export interface IChapaPaymentResponse {
  checkout_url: string;
  message: string;
  status: string;
}

export enum SubscriptionType {
  "12Month" = "12Month",
  "6Month" = "6Month",
  "1Month" = "1Month",
}
