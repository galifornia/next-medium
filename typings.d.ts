export interface PostType {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: ImageType;
  };
  comments: CommentType[];
  slug: {
    current: string;
  };
  mainImage: ImageType;
  body: [object];
}

export interface ImageType {
  asset: {
    _type: 'image';
    _ref: string;
  };
}

export interface CommentType {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
