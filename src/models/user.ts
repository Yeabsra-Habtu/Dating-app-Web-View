export interface IUser {
  _id: string;
  chatId: number;
  age: number;
  city: string;
  country: string;
  image: string;
  name: string;
  gender: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  free_match_count: number;
  is_active: true;
  coin: number;
  gift: number;
  photoUrls: [string];
  questions: [Question];
}

export interface Question {
  question: string;
  answer: string;
}

export interface IUserWithdrawResponse {
  data: IUser;
  minimumWithdrawableCoin: number;
  oneCoinInBirr: number;
}
