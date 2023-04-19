import { IconLoader2, TablerIconsProps } from '@tabler/icons-react';
import classNames from 'classnames';
import { FC } from 'react';

const Loader: FC<TablerIconsProps> = ({ className, ...props }) => {
  return (
    <IconLoader2 className={classNames('text-slate-500 animate-spin', className)} {...props} />
  );
};

export default Loader;
