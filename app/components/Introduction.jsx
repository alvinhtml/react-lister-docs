import React, {Component, useState, useEffect, useRef} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import shlStyle from '../highlighter.config.js';

console.log("shlStyle", shlStyle);

import {Row} from 'react-miniui';





const rowKey = 'id';

class Introduction extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>React Lister</h1>
        <h2>支持功能</h2>
        <Row>
          <ul style={{margin: '32px'}} className="check-list">
            <li><i className="icon-check"></i> 分页</li>
            <li><i className="icon-check"></i> 设置分页Size</li>
            <li><i className="icon-check"></i> 显示和隐藏列</li>
            <li><i className="icon-check"></i> 拖点改变列宽</li>
            <li><i className="icon-check"></i> 拖动改变两列的前后顺序</li>
            <li><i className="icon-check"></i> 按列搜索</li>
            <li><i className="icon-check"></i> 自定义列标题</li>
            <li><i className="icon-check"></i> 自定义内容</li>
            <li><i className="icon-check"></i> 自定义操作</li>
            <li><i className="icon-check"></i> 全选/单选</li>
          </ul>
          <div style={{margin: '32px'}}>
            <a href="https://www.npmjs.com/package/react-lister" target="_blank" style={{marginRight: '16px'}}>
              <svg height="16" viewBox="0 0 780 250"><path fill="#231F20" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>
            </a>
            <a href="https://github.com/alvinhtml/react-lister" target="_blank">
              <svg height="24" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
          </div>
        </Row>
        <h2>安装</h2>
        <SyntaxHighlighter {...shlStyle} language="bash">
{
`npm install react-lister --save`
}
        </SyntaxHighlighter>
        <h2>使用方法</h2>
        <p>假设有一组用户的 Json 数据，需要创建一个用户列表</p>
        <SyntaxHighlighter {...shlStyle} language="json">
        {
`[{
  "id": 1,
  "name": "alvin",
  "email": "alvinhtml@gmail.com",
  "state": 1
}, {
  "id": 2,
  "name": "Serenity Beier",
  "email": "gulgowski.adrienne@gmail.com",
  "state": 0
}]`
        }
        </SyntaxHighlighter>
        <p>每一个列表需要创建两个组件</p>
        <ul>
          <li><code>List.jsx</code> - 用来配置用户列表</li>
          <li><code>User.jsx</code> - 用来加载用户数据</li>
        </ul>

        <p>在 List 组件中，我首先需要通过 <code>new Column()</code> 创建列，例如要创建一个标题为<code>用户名</code>的列，方式如下：</p>
        <SyntaxHighlighter {...shlStyle}>
{
`import Lister, {Column, withLister} from 'react-lister';

// 语法：new Column(标题，key, Fn, [Options])

new Column('用户名', 'name', row => <span>row.name</span>, {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 180, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
})`
}
        </SyntaxHighlighter>

        <p>完使代码如下：</p>

        <SyntaxHighlighter {...shlStyle}>
{
`
const options = {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 180, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
}

function UserState({user}) {
  return user.state !== 0 ? '停用' : '启用';
}

function UserActions({user}) {
  const handleDelete = () => {
    console.log(user.id);
    // 删除操作
  }
  return (
    <React.Fragment>
      <Button>编辑</Button>
      <Button onClick={handleDelete}>删除</Button>
    </React.Fragment>
  )
}

const userColumns = [
  new Column('ID', 'id', row => <React.Fragment>{row.id}</React.Fragment>, {...options, width: 60}),
  new Column('用户名', 'name', row => <React.Fragment>{row.name}</React.Fragment>, {...options, getter: Column.Getter('name')}),
  new Column('邮箱', 'email', row => <span>{row.email}</span>, {...options, getter: Column.Getter('email')}),
  new Column('状态', 'state', row => <UserState user={row} />, options),
  new Column('操作', 'option', row => <UserActions user={row} />)
]
`
}
        </SyntaxHighlighter>
        <p>userColumns 代表了我们每一列的配置，接下来需要将 userColumns 传递给 withLister 高阶组件，<code>List.jsx</code> 完整代码：</p>
        <SyntaxHighlighter {...shlStyle}>
{
`
import * as React from 'react';
import {Button} from 'react-miniui';

import Lister, {Column, withLister} from 'react-lister';
import 'react-lister/dist/lister.css';


const options = {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 180, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
}

function UserState({user}) {
  return user.state !== 0 ? '停用' : '启用';
}

function UserActions({user}) {
  const handleDelete = () => {
    console.log(user.id);
    // 删除操作
  }
  return (
    <React.Fragment>
      <Button>编辑</Button>
      <Button onClick={handleDelete}>删除</Button>
    </React.Fragment>
  )
}

const userColumns = [
  new Column('ID', 'id', row => <React.Fragment>{row.id}</React.Fragment>, {...options, width: 60}),
  new Column('用户名', 'name', row => <React.Fragment>{row.name}</React.Fragment>, {...options, getter: Column.Getter('name')}),
  new Column('邮箱', 'email', row => <span>{row.email}</span>, {...options, getter: Column.Getter('email')}),
  new Column('状态', 'state', row => <UserState user={row} />, options),
  new Column('操作', 'option', row => <UserActions user={row} />)
]

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIDs: []
    };
  }

  handleSelect = (selectedIDs: Array<string>) => {
    this.setState({
      selectedIDs
    });
  };

  render() {
    const {toggleSelectAll, rows, reload, createRef, columns, total} = this.props;
    const {selectedIDs} = this.state;

    return (
      <div>
        <Lister
          ref={createRef}
          rows={rows}
          total={total}
          columns={columns}
          page={1}
          selectable={true}
          onSelect={this.handleSelect}
          reload={reload}
        >
          <Button onClick={toggleSelectAll}>全选</Button>
          <Button color="red">删除</Button>
        </Lister>
      </div>
    );
  }
}

// 通过高阶组件将 UserList 和 userColumns 接合
export default withLister(UserList, 'user', userColumns);

`
}
        </SyntaxHighlighter>

        <p>接下来我们创建 <code>User.jsx</code></p>
        <SyntaxHighlighter {...shlStyle}>
{
`
import React, {Component, useState, useEffect} from 'react';
import superagent from 'superagent'; // or axios

// 导入前文中的 List 组件
import List from './List.jsx';

// 定义每一行的唯一标识 key, 要和数据中的唯一标识一致
const rowKey = 'id';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      total: 0
    }
  }

  componentDidMount() {
    this.loadUser(1);
  }

  async loadUser(page = 1, limit = 10, order = ['name', 'asc'], search) {
    try {
      const users = await superagent.get('/userList.json')
        .query({
          page,
          order,
          limit,
          search
        });

      this.setState({
        users: users.body,
        total: users.body.length // users.header['x-total']
      })

    } catch(err) {
      throw err;
    }
  }

  render() {
    const {users, total} = this.state;

    return (
      <div>
        <List
          rows={users}
          total={total}
          rowKey={rowKey}
        />
      </div>
    );
  }
}

export default User;
`
}
        </SyntaxHighlighter>
        <p>以上是前端实现分页的方式，如果数据比较多，可以使用后端分页，为 <code>List</code> 传递一个 <code>reload</code> 方法:</p>
        <SyntaxHighlighter {...shlStyle}>
{
`
<List
  rows={users}
  total={total}
  rowKey={'id'}
  reload={(pagination) => {
    const {page, limit, order, search} = pagination;
    this.loadUser(page, limit, order, search);
  }}
/>
`
}
        </SyntaxHighlighter>
        <p>当 page, limit, order, search 这些参数改变时，都会调用 <code>loadUser(page, limit, order, search)</code></p>
      </div>
    );
  }
}

export default Introduction;
