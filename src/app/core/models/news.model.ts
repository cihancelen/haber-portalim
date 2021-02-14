export interface News {
  id?: string;
  title: string;
  description: string;
  createdDate: Date | any;
  modifiedDate: Date | any;
  author: {
    email: string;
  },
  img: string;
  tags: string[];
  friendlyUrl: string;
}