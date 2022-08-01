import { GetStaticProps } from 'next';
import React from 'react';
import Nav from '../../components/Nav';
import { sanityClient } from '../../config';
import { PostType } from '../../typings';

interface Props {
  post: PostType;
}

const PostPage = ({ post }: Props) => {
  return (
    <main>
      <Nav />
    </main>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
    _id,
    slug {
      current
    }
  }`;

  const slugs = await sanityClient.fetch(query);

  const paths = slugs.map(
    ({ slug: { current } }: { slug: { current: string } }) => {
      return {
        params: {
          slug: current,
        },
      };
    }
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    body,
    slug {
      current
    }
  }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};
