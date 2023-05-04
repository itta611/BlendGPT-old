import { CanvasDrawerProvider } from 'hooks/useCanvasDrawer';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CanvasDrawerProvider>
      <Component {...pageProps} />
      <Analytics />
    </CanvasDrawerProvider>
  );
}
