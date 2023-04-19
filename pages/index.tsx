import { IconSend } from '@tabler/icons-react';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Logo from 'components/Logo';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlendGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-[800px] m-auto">
        <div className="py-3">
          <h2 className="text-4xl">
            <Logo />
          </h2>
        </div>
        <div className="bg-white/10 border-t border-l border-white/10 rounded-md p-10 mt-6 shadow-md">
          <div className="relative">
            <Image
              src="/dummy.png"
              width={800}
              height={600}
              className="w-full scale-105 absolute top-0 blur-md opacity-20 select-none pointer-events-none"
              aria-hidden="true"
              alt="image"
            />
            <Image src="/dummy.png" width={800} height={600} className="w-full" alt="image" />
          </div>
          <Input
            className="mt-8"
            rightItem={
              <IconButton variant="ghost" className="rounded-l-none w-16">
                {<IconSend size={20} />}
              </IconButton>
            }
          />
        </div>
      </main>
    </>
  );
}
