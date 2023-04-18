import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        className,
        'w-full shadow-md bg-white/10 rounded-md p-3 outline-none focus:ring-4 transition-all'
      )}
    />
  );
};

export default Input;
