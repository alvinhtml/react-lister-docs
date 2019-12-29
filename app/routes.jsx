import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Header from '~/components/Header';
import Main from '~/components/Main';
import User from '~/components/User';


export default class Router extends Component {
  render() {
    return(
      <Main>
        <Header />
        <Switch>
          <Route exact path='/' component={User}/>
        </Switch>
      </Main>
    )
  }
}
