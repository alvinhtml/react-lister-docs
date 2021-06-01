import React, {Component, useState, useEffect} from 'react';
import ReactDOM, {render} from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

// use react-miniui
import 'react-miniui/dist/miniui.css';
// import '../../react-miniui/dist/miniui.css';

// if use react-miniui Modal, import ActiveModal
import {Miniui} from 'react-miniui';

import './scss/main.scss';

import Router from '~/routes';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

class App extends Component {
  render() {
    return(
      <React.Fragment>
        <Router />
      </React.Fragment>
    )
  }
}

render(
  <BrowserRouter>
    <div>
      <Header />
      <div className="web-application">
        <Sidebar />
        <App />
      </div>
      <Miniui />
    </div>
  </BrowserRouter>,
document.getElementById('webApplication'))
