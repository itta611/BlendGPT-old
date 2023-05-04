import Header from 'components/Header';
import Footer from 'components/Footer';
import EditPanel from 'components/EditPanel';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlendGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-between items-center space-y-16">
        <main className="max-w-[800px] w-full sm:px-10 px-5">
          <Header />
          <EditPanel />
        </main>
        <Footer />
      </div>
    </>
  );
}
