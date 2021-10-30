import { ChakraProvider, theme } from '@chakra-ui/react';
import { Switch, Route } from 'react-router';
import { Header, Content, Footer } from './containers/sections';
import { LoginPage } from './pages';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={PageTemplate} />
      </Switch>
    </ChakraProvider>
  );
}

function PageTemplate() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
