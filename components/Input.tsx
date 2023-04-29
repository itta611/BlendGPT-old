import classNames from 'classnames';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface HorizontalItemProps {
  children: ReactNode;
  disabled?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftItem?: ReactNode;
  rightItem?: ReactNode;
}

const HorizontalItem: FC<HorizontalItemProps> = ({ disabled, children }) => {
  return (
    <div
      className={classNames('absolute right-0 top-0 bottom-0 flex items-center', {
        'pointer-events-none': disabled,
      })}
    >
      {children}
    </div>
  );
};

const Input: FC<InputProps> = ({ className, disabled, leftItem, rightItem, ...props }) => {
  return (
    <div className={classNames(className, 'relative', { 'opacity-70': disabled })}>
      {leftItem && <HorizontalItem>{leftItem}</HorizontalItem>}
      <input
        {...props}
        disabled={disabled}
        className={classNames(
          'w-full shadow-md bg-white/10 rounded-md px-5 py-3 outline-none transition-all'
        )}
      />
      {rightItem && <HorizontalItem disabled={disabled}>{rightItem}</HorizontalItem>}
    </div>
  );
};

export default Input;
