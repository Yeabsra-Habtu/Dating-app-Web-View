export interface IMatch {
  _id: string;
  liked_id: {
    _id: string;
    image: string;
    name: string;
  };
  liker_id: {
    _id: string;
    image: string;
    name: string;
  };
  anonymise: true;
  createdAt: string;
  updatedAt: string;
}
