import Logo from 'components/Logo';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlendGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-[800px] m-auto py-3">
        <h2 className="text-4xl">
          <Logo />
        </h2>
      </main>
    </>
  );
}
