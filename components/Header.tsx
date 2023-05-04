import { FC } from 'react';
import Logo from './Logo';
import Button from './Button';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

const Header: FC = () => {
  return (
    <div className="flex justify-between items-center py-3">
      <Logo />
      <a href="https://github.com/itta611" target="_blank" rel="noopener noreferrer">
        <Button
          leftIcon={
            <IconStarFilled
              size={20}
              className="text-yellow-400 group-hover:text-pink-950 transition"
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
