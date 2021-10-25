import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';
import { createBrowserHistory } from 'history';
import './app.css';

const customHistory = createBrowserHistory();

export const App = () => {
  return (
    <Router history={customHistory}>
      <Header />
      <Switch>
        <Route path="/menu">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
