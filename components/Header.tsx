import { FC } from 'react';
import Logo from './Logo';
import Button from './Button';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

const Header: FC = () => {
  return (
    <div className="flex justify-between items-start sm:items-center py-3 flex-col sm:flex-row gap-y-2">
      <Logo />
      <a href="https://github.com/itta611/BlendGPT" target="_blank" rel="noopener noreferrer">
        <Button
          leftIcon={
            <IconStarFilled
              size={20}
              className="text-yellow-400 group-hover:text-pink-900 transition"
            />
          }
        >
          Star on GitHub
        </Button>
      </a>
    </div>
  );
};

export default Header;
