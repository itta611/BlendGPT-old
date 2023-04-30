'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={classNames(
      'relative flex h-[200px] touch-none select-none justify-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-full w-1 overflow-hidden rounded-full bg-white/20">
      <SliderPrimitive.Range />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={classNames(
        'flex h-7 w-20 bg-slate-800 rounded-sm outline-none items-center shadow',
        'before:block before:bg-white/20 before:h-[2px] before:w-full'
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
