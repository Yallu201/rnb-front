import { useCallback } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Header = () => {
  const history = useHistory();
  const onClickLogin = useCallback(() => history.push('/login'), [history]);
  return (
    <div className="container mx-auto p-4 flex">
      <Heading className="flex-grow" size="4xl">
        <Link to="/">RnB</Link>
      </Heading>
      <div className="flex items-center">
        <Button onClick={onClickLogin}>로그인</Button>
        <ColorModeSwitcher />
      </div>
    </div>
  );
};

export default Header;
