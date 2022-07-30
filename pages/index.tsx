import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Medium blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <section className='max-w-7xl min-h-[40vh] mx-auto bg-yellow-500 flex justify-between items-center px-8 border-y-2 border-x-black'>
        <div className='flex flex-col gap-4 w-full tablet:max-w-[50%]'>
          <h1 className='text-3xl tablet:text-5xl font-serif'>
            <span className='underline'>Medium</span> is a place to write, read
            and, connect
          </h1>
          <p>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </p>
        </div>
        <div className='hidden phablet:block font-bold text-8xl tablet:text-[12rem] laptop:text-[18rem] desktop:text-[24rem] w-[50%] text-center font-serif'>
          M
        </div>
      </section>
    </div>
  );
};

export default Home;
