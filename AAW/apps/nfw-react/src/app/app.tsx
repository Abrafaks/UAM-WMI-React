import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';
import { createBrowserHistory } from 'history';
import './app.css';
import Cart from './Components/Cart/Cart';
import Home from './Components/Home/Home';

const customHistory = createBrowserHistory();

export const App = () => {
  return (
    <Router history={customHistory}>
      <Header />
      <Switch>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/*">
          <Redirect to='home'/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
