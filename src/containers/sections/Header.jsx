import { Heading } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Header = () => {
  return (
    <div className="container mx-auto p-4 flex">
      <Heading className="flex-grow" size="4xl">
        RnB
      </Heading>
      <div className="flex items-center">
        <ColorModeSwitcher />
      </div>
    </div>
  );
};

export default Header;
