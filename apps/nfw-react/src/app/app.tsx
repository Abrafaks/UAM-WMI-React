import React from 'react';
import {Router} from "react-router-dom";
import Header from "./Components/Header/Header";
import { createBrowserHistory } from "history";
import './app.css'

const customHistory = createBrowserHistory();

export const App = () => {
  return (<Router history={customHistory}>
    <Header/>
  </Router>)
};

export default App;
