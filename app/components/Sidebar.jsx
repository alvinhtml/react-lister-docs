import React, {Component, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  state = {
    closed: false
  }

  handleClick() {
    this.setState({
      closed: !this.state.closed
    });
  }
  render() {
    return(
      <aside className={`sidebar ${this.state.closed ? 'closed-sidebar' : ''}`}>
        <div className="sidebar-toggle" onClick={this.handleClick.bind(this)}><i className="icon-menu"></i></div>
        <nav>
          <ul>
            <li>
              <Link to="/introduction"><i className="icon-home"></i> <span>首页</span></Link>
            </li>
            <li>
              <Link to="/user"><i className="icon-user"></i> <span>用户列表</span></Link>
            </li>
          </ul>
        </nav>
      </aside>
    )
  }
}
