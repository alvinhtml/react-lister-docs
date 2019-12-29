import React, {Component, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {ButtonGroup, Button} from 'react-miniui';

export default class Header extends Component {
  render() {
    return(
      <main className="main">
        {this.props.children}
      </main>
    )
  }
}
