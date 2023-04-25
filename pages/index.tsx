import { IconSend } from '@tabler/icons-react';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Logo from 'components/Logo';
import WebGLCanvas from 'components/WebGLCavas';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Response } from 'types/base';

async function postMessage(url: string, { arg }: { arg: string }): Promise<Response> {
  const r = await fetch(url, { method: 'POST', body: JSON.stringify({ message: arg }) });
  return r.json();
}

export default function Home() {
  const { trigger } = useSWRMutation('/api/edit-image', postMessage);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [params, setParams] = useState([]);
  const canvasDrawer = useCanvasDrawer();

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setImageURL(url);
  };

  const handlePost = async () => {
    if (isLoading) return;

    if (typeof inputMessage !== 'undefined' && inputMessage !== '') {
      setIsLoading(true);
      setErrorMessage('');
      setInputMessage('');

      const response = await trigger(inputMessage);
      if (typeof response === 'undefined') {
        throw Error('Post failed.');
      }
      setIsLoading(false);

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      canvasDrawer.updateFragmentShader(response.code);
      response.params.forEach((param) => {
        canvasDrawer.appendUniformVariable(param.name, param.value);
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
          {imageURL ? (
            <div className="max-h-[500px]">
              <WebGLCanvas imageURL={imageURL} className="w-full max-h-[500px] object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-[400px] space-y-6">
              <p className="text-center text-slate-400 text-sm">
                画像を選択してください。
                <br />
                （選択された画像がサーバーにアップロードされることはありません。）
              </p>
              <label htmlFor="file-select">
                <Button as="span" className="cursor-pointer">
                  画像を選択
                </Button>
              </label>
              <input
                type="file"
                id="file-select"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          )}
          <form>
            <Input
              className="mt-8"
              disabled={typeof imageURL === 'undefined'}
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
              placeholder="操作を具体的に書いてください！"
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
            {isLoading && <span className="text-xs font-bold mt-2">AIが考え中...</span>}
            {errorMessage && (
              <div className="text-xs font-bold text-red-400 mt-2">
                AIからのメッセージ: {errorMessage}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
