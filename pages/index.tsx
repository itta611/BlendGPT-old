import { IconSend } from '@tabler/icons-react';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import ParamArea from 'components/ParamArea';
import WebGLCanvas from 'components/WebGLCavas';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Head from 'next/head';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Param, Response } from 'types/base';

async function postMessage(
  url: string,
  { arg }: { arg: { message: string; continueConversation: boolean } }
): Promise<Response> {
  const r = await fetch(url, { method: 'POST', body: JSON.stringify(arg) });
  return r.json();
}

export default function Home() {
  const { trigger } = useSWRMutation('/api/edit-image', postMessage);
  const [inputMessage, setInputMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [params, setParams] = useState<Param[]>([]);
  const [shader, setShader] = useState<string | undefined>(undefined);
  const continueConversation = useRef(false);

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

      const response = await trigger({
        message: inputMessage,
        continueConversation: continueConversation.current,
      });

      continueConversation.current = true;

      setIsLoading(false);
      if (typeof response === 'undefined') {
        throw Error('Post failed.');
      }

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      setShader(response.code);
      setParams(response.params);
    }
  };

  const handleParamChange = (name: string, value: number) => {
    setParams(
      params.map((param) => {
        if (param.name === name) {
          return { ...param, value };
        } else {
          return param;
        }
      })
    );
  };

  const handleError = () => {
    setErrorMessage('実行時エラーが発生しました...\n再度別の書き方でお試しください。');
  };

  return (
    <>
      <Head>
        <title>BlendGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-between space-y-16">
        <main className="w-[800px] mx-auto">
          <Header />
          <div className="bg-white/10 border-t border-l border-white/10 rounded-md p-10 mt-6 shadow-md space-y-8">
            {imageURL ? (
              <div className="max-h-[500px]">
                <WebGLCanvas
                  imageURL={imageURL}
                  params={params}
                  shader={shader}
                  onShaderError={handleError}
                  className="w-full max-h-[500px] object-contain"
                />
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
              {isLoading && <div className="text-xs font-bold mt-2">AIが考え中...</div>}
              {errorMessage && (
                <div className="text-xs font-bold text-red-400 mt-2">
                  AIからのメッセージ: {errorMessage}
                </div>
              )}
            </form>
            {params.length > 0 && (
              <>
                <div className="h-0 border-t border-t-white/20 mx-3"></div>
                <ParamArea params={params} handleParamChange={handleParamChange} />
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
