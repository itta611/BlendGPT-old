import { CanvasDrawerProvider } from 'hooks/useCanvasDrawer';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CanvasDrawerProvider>
      <Component {...pageProps} />
    </CanvasDrawerProvider>
  );
}
