

export interface IDeck {
  id: string;
  title: string;
  subject: string;
  field: string;
  author: string;
  authorId: string;
  rating: number;
  cards: ICard[];
  lastUpdated: string;
}

export interface ICard {
  id: string;
  title: string;
  question: string;
  answer: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
}
