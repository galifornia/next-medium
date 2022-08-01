import React from 'react';
import { urlFor } from '../config';
import { PostType } from '../typings';

const Post = ({ title, description, author, mainImage }: PostType) => {
  const mainImg = urlFor(mainImage).width(320).url();
  const authorImg = urlFor(author.image).url();

  return (
    <div className='group px-4 w-full h-full relative rounded-xl overflow-hidden flex flex-col justify-between'>
      <img
        className='group-hover:scale-105 transition-transform duration-200 ease-in-out w-full h-60 object-cover'
        src={mainImg}
        alt=''
      />

      <div className='grid grid-cols-[5fr_1fr] gap-3 mt-4 mb-8 tablet:gap-6 justify-between'>
        <div className='flex flex-col gap-2'>
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
        <img
          className='rounded-full w-8 h-8 object-cover justify-self-end place-self-end'
          src={authorImg}
        />
      </div>
    </div>
  );
};

export default Post;
