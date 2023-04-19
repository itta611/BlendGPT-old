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
          'inline-flex items-center justify-center font-bold whitespace-nowrap relative select-none overflow-hidden',
          'focus:outline-none transition',
          { 'cursor-default': isLoading },
          { 'h-9 px-4 text-sm rounded-md': size === 'sm' },
          { 'h-11 px-6 text-base rounded-lg': size === 'md' },
          {
            'bg-purple-gradient before:opacity-0 hover:before:opacity-100 before:transition before:absolute before:inset-0 before:bg-purple-dark-gradient !text-white':
              variant === 'primary',
          },
          {
            'bg-white text-gray-700 hover:bg-gray-100 border': variant === 'secondary',
          },
          { 'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost' },
          className
        )}
        onClick={isLoading ? undefined : onClick}
        ref={ref}
        {...props}
      >
        {showLoader && <span className="mr-2">{leftIcon}</span>}
        {isLoading && (
          <Loader
            className={classNames('mr-2', { 'text-white': variant === 'primary' })}
            size={size === 'md' ? 20 : 16}
          />
        )}
        <span className="z-10">{children}</span>
      </Component>
    );
  }
);
Button.displayName = 'Button';

export default Button;
