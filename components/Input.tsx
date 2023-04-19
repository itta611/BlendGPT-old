import classNames from 'classnames';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface HorizontalItemProps {
  children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftItem?: ReactNode;
  rightItem?: ReactNode;
}

const HorizontalItem: FC<HorizontalItemProps> = ({ children }) => {
  return <div className="absolute right-0 top-0 bottom-0 flex items-center">{children}</div>;
};

const Input: FC<InputProps> = ({ className, leftItem, rightItem, ...props }) => {
  return (
    <div className={classNames(className, 'relative')}>
      {leftItem && <HorizontalItem>{leftItem}</HorizontalItem>}
      <input
        {...props}
        className={
          'w-full shadow-md bg-white/10 rounded-md px-5 py-3 outline-none focus:ring-4 transition-all'
        }
      />
      {rightItem && <HorizontalItem>{rightItem}</HorizontalItem>}
    </div>
  );
};

export default Input;
