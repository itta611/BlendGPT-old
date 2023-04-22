import { IconSend } from '@tabler/icons-react';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Logo from 'components/Logo';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

async function postMessage(url: string, { arg }: { arg: string }) {
  await fetch(url, { method: 'POST', body: JSON.stringify({ message: arg }) }).then((r) => {
    if (!r.ok) return;
    r.json();
  });
}

export default function Home() {
  const { trigger } = useSWRMutation('/api/edit-image', postMessage);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    if (isLoading) return;

    if (typeof message !== 'undefined' && message !== '') {
      setIsLoading(true);
      setMessage('');

      await trigger(message);
      setIsLoading(false);
    }
  };

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
          <form>
            <Input
              className="mt-8"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              rightItem={
                <IconButton
                  type="submit"
                  variant="ghost"
                  className="rounded-l-none w-16"
                  isLoading={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePost();
                  }}
                >
                  {<IconSend size={20} />}
                </IconButton>
              }
            />
          </form>
        </div>
      </main>
    </>
  );
}
