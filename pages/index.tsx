import { IconSend } from '@tabler/icons-react';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Logo from 'components/Logo';
import WebGLCanvas from 'components/WebGLCavas';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

async function postMessage(
  url: string,
  { arg }: { arg: string }
): Promise<{ isSuccess: boolean; code: string; params: any[] }> {
  const r = await fetch(url, { method: 'POST', body: JSON.stringify({ message: arg }) });
  return r.json();
}

export default function Home() {
  const { trigger } = useSWRMutation('/api/edit-image', postMessage);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState([]); // TODO: Create `param` type
  const canvasDrawer = useCanvasDrawer();

  const handlePost = async () => {
    if (isLoading) return;

    if (typeof message !== 'undefined' && message !== '') {
      setIsLoading(true);
      setMessage('');

      const response = await trigger(message);
      if (typeof response === 'undefined') {
        throw Error('Post failed.');
      }
      setIsLoading(false);

      if (!response.isSuccess) {
        alert('エラーが発生しました。');
        return;
      }

      canvasDrawer.updateFragmentShader(response.code);
      console.log(response.code);
      response.params.forEach((param) => {
        canvasDrawer.appendUniformVariable(param.name, param.default);
      });
      canvasDrawer.draw();
      setParams(response.params as never);
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
            <WebGLCanvas className="w-full" />
            {/* <Image
              src="/dummy.png"
              width={800}
              height={600}
              className="w-full scale-105 absolute top-0 blur-md opacity-20 select-none pointer-events-none"
              aria-hidden="true"
              alt="image"
            />
            <Image src="/dummy.png" width={800} height={600} className=X alt="image" /> */}
          </div>
          <form>
            <Input
              className="mt-8"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="行いたい操作をできるだけ具体的に書いてね！"
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
