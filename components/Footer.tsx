import { FC } from 'react';
import { LogoWithOutGlow } from './Logo';

const Loader: FC = () => {
  return (
    <footer className="flex flex-col items-center bg-slate-700 p-6 border-t border-slate-600 w-full">
      <LogoWithOutGlow className="!fill-slate-500 mb-2" />
      <p className="text-slate-400 text-center">
        Developed by{' '}
        <a href="https://twitter.com/IttaFunahashi" target="_blank" rel="noreferrer noopener">
          Itta Funahashi
        </a>
      </p>
    </footer>
  );
};

export default Loader;
