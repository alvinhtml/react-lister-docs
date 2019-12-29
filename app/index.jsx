import React, {Component, useState, useEffect} from 'react';
import ReactDOM, {render} from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

// use react-miniui
import 'react-miniui/dist/miniui.css';

// if use react-miniui Modal, import ActiveModal
import {ActiveModal} from 'react-miniui';

import './scss/style.scss';

import Router from '~/routes';

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
      <App />
      <div><ActiveModal /></div>
    </div>
  </BrowserRouter>,
document.getElementById('webApplication'))
