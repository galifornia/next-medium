export interface PostType {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: ImageType;
  };
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
