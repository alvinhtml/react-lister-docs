import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Main from '~/components/Main';
import User from '~/components/User';


export default class Router extends Component {
  render() {
    return(
      <Main>
        <Switch>
          <Route path='/' component={User}/>
          <Route exact path='/home' component={User}/>
          <Route exact path='/user' component={User}/>
        </Switch>
      </Main>
    )
  }
}
