import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Main from '~/components/Main';
import Introduction from '~/components/Introduction';
import User from '~/components/User';


export default class Router extends Component {
  render() {
    return(
      <Main>
        <Switch>
          <Route exact path='/' component={User}/>
          <Route path='/introduction' component={Introduction}/>
          <Route path='/user' component={User}/>
        </Switch>
      </Main>
    )
  }
}
