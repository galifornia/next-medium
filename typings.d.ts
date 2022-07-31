export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: string;
  };
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  body: [object];
}
