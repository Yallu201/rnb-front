import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';

const Content = () => {
  const [items, setItems] = useState(null);
  const toggleContentSize = () => {
    if (!!items) {
      setItems(null);
      return;
    }
    const newItems = new Array(100).fill('This is Item');
    setItems(newItems.map(item => <div>{item}</div>));
  };
  return (
    <Flex flex="1" justifyContent="center">
      <Flex
        p="0"
        flexDirection="column"
        w={{ base: '320px', sm: '1200px' }}
        bg="orange.200"
      >
        This is Content
        <div>
          <Button onClick={toggleContentSize}>Toggle items</Button>
        </div>
        {items}
      </Flex>
    </Flex>
  );
};

export default Content;
