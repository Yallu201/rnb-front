import { Route, Router, Switch } from 'react-router';
import { MainBoard, LoginPage } from '../../pages';

const Content = () => {
  return (
    <div className="flex-grow">
      <div className="container mx-auto px-4 h-full">
        <Switch>
          <Route path="/" exact component={MainBoard} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
