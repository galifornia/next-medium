import { GetStaticProps } from 'next';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PortableText from 'react-portable-text';
import Nav from '../../components/Nav';
import { sanityClient, urlFor } from '../../config';
import { PostType } from '../../typings';

interface Props {
  post: PostType;
}

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const PostPage = ({ post }: Props) => {
  const mainImg = urlFor(post.mainImage).url();
  const authorImg = urlFor(post.author.image).url();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log({ data });
  };
  return (
    <main>
      <Nav />

      <img className='w-full h-40 object-cover' src={mainImg} alt='' />

      <article className='max-w-3xl mx-auto p-5 flex flex-col gap-4'>
        <h1 className='text-3xl mt-6 mb-3 mx-auto'>{post.title}</h1>
        <h3 className='text-xl font-light text-gray-500'>{post.description}</h3>

        <div className='flex items-center gap-2'>
          <img className='rounded-full w-8 h-8' src={authorImg} alt='' />
          <h4 className='font-extralight text-sm'>
            Blog post by{' '}
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </h4>
        </div>

        <PortableText
          className='mt-2'
          content={post.body}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          serializers={{
            h1: (props: any) => {
              <h1 className='text-2xl font-bold my-5' {...props} />;
            },
            h2: (props: any) => {
              <h2 className='text-xl font-bold my-5' {...props} />;
            },
            li: ({ children }: any) => {
              <li className='ml-4 list-disc'>{children}</li>;
            },
            link: ({ href, children }: any) => {
              <a href={href} className='text-blue-500 hover:underline'>
                {children}
              </a>;
            },
          }}
        ></PortableText>
      </article>

      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
      <div className='max-w-2xl mx-auto p-5'>
        <h4 className='text-sm text-yellow-500'>Enjoyed this article?</h4>
        <h5 className='text-3xl font-bold'>Leave a comment below!</h5>
      </div>

      <form
        className='flex flex-col p-5 max-w-2xl mx-auto mb-10 gap-4 relative'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input {...register('_id')} type='hidden' name='_id' value={post._id} />
        <label className='flex flex-col gap-2'>
          <span className='text-gray-700'>Name</span>
          <input
            {...register('name', { required: true })}
            className='shadow border rounded form-input ring-yellow-500 outline-none focus:ring py-2 px-3'
            placeholder='John Adams'
            type='text'
          />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-gray-700'>Email</span>
          <input
            {...register('email', { required: true })}
            className='shadow border rounded form-input ring-yellow-500 outline-none focus:ring py-2 px-3'
            placeholder='john.adams@gmail.com'
            type='email'
          />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-gray-700'>Comment</span>
          <textarea
            {...register('comment', { required: true })}
            className='shadow border rounded form-textarea ring-yellow-500 outline-none focus:ring py-2 px-3'
            placeholder='Write your comment here...'
            rows={8}
          />
        </label>

        <div className='flex flex-col gap-4'>
          {errors.name && (
            <span className='text-red-500'>- Name field is required</span>
          )}
          {errors.email && (
            <span className='text-red-500'>- Email field is required</span>
          )}
          {errors.comment && (
            <span className='text-red-500'>- Comment field is required</span>
          )}
        </div>

        <button
          className='bg-yellow-500 text-white font-bold w-full p-2 cursor-pointer '
          type='submit'
        >
          Publish
        </button>
      </form>
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
    revalidate: 60, // 1 min
  };
};
