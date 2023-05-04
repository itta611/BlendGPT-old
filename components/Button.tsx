import classNames from 'classnames';
import { ReactNode, ElementType, forwardRef, PropsWithRef, ButtonHTMLAttributes } from 'react';
import Loader from './Loader';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'xs';
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  as?: ElementType;
}

const Button = forwardRef<HTMLButtonElement, PropsWithRef<ButtonProps>>(
  (
    {
      leftIcon,
      variant = 'primary',
      size = 'md',
      children,
      isLoading,
      className,
      as,
      onClick,
      ...props
    },
    ref
  ) => {
    const showLoader = leftIcon && !isLoading;
    const Component: ElementType = as ?? 'button';

    return (
      <Component
        className={classNames(
          'group inline-flex items-center justify-center font-bold whitespace-nowrap relative select-none space-x-2 text-white',
          'transition',
          {
            'hover:bg-pink-200 hover:shadow-[0_0_15px_-3px] hover:shadow-pink-400 hover:text-pink-950 border border-transparent hover:border-l-white/20 hover:border-t-white/20':
              !isLoading,
          },
          { 'cursor-default': isLoading },
          { 'h-9 px-4 text-sm rounded-md': size === 'sm' },
          { 'h-11 px-6 text-base rounded-lg': size === 'md' },
          {
            'bg-white/20 border-l-white/10 border-t-white/10': variant === 'primary',
          },
          {
            'bg-transparent': variant === 'ghost',
          },
          className
        )}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {showLoader && <span className="mr-2">{leftIcon}</span>}
        {isLoading && <Loader className={'text-inherit'} size={size === 'md' ? 20 : 16} />}
        {children}
      </Component>
    );
  }
);
Button.displayName = 'Button';

export default Button;
