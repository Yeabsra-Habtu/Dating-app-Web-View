export interface IError {
  status: number;
  message: string;
  errors: string[];
}

export interface IApiResponse<T> {
  data?: T;
  error?: IError;
}
