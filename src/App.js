import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header, Content, Footer } from './containers/sections';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="flex flex-col h-screen">
        <Header />
        <Content />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
