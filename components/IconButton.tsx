import classNames from 'classnames';
import { ElementRef, forwardRef, PropsWithoutRef } from 'react';
import Button, { ButtonProps } from './Button';

const IconButton = forwardRef<
  ElementRef<typeof Button>,
  Omit<PropsWithoutRef<ButtonProps>, 'size'>
>(({ children, className, isLoading, ...props }, ref) => {
  return (
    <Button
      className={classNames('w-12 h-12 !p-0 text-gray-500', className)}
      isLoading={isLoading}
      ref={ref}
      {...props}
    >
      {!isLoading && children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
