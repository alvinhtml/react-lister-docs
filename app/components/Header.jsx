import React, {Component, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo"><a>React-<span>Lister</span></a></div>
      </header>
    )
  }
}
