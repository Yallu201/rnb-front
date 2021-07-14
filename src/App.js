import React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';
import { Header, Content, Footer } from './containers/sections';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" h="100vh">
        <Header />
        <Content />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
