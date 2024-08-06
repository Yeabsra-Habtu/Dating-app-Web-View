export interface IAuthUser {
  _id: string;
  chatId: number;
  age: number;
  city: string;
  country: string;
  image: string;
  name: string;
  gender: string;
  is_active: string;
  free_match_count: number;
  coin: number;
  language: string;
  bio?: string;
  subscription: {
    subscription_type: string;
    startDate: string;
    endDate: string;
  } | null;
  boost: null;
  is_online: false;
  last_seen: string;
  search_settings: {
    age: {
      min: number;
      max: number;
    };
    city: string;
    country: string;
  };
  ranking_class: string;
  photoUrls: [];
  questions: {
    question: string;
    answer: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  status: number;
  data: IAuthUser;
  token: string;
  message: string;
}

export interface IProfileEditInput {
  name: string;
  age: number;
  bio: undefined | string;
}
