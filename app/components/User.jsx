import React, {Component, useState, useEffect, useRef} from 'react';
import superagent from 'superagent';
import Lister, {Column} from '~/../../react-lister/dist/index.js';
import'~/../../react-lister/dist/lister.css';
import UserActions from '~/components/user/UserActions'

import {Button} from 'react-miniui';

const options = {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 200, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
}

const columns = [
  new Column('用户', Column.getValue('name'), row => <span>{row.name}</span>, options),
  new Column('邮箱', Column.getValue('email'), row => <span>{row.name}</span>, options),
  new Column('角色', Column.getValue('type'), row => <span>{row.name}</span>, options),
  new Column('操作', null, row => <UserActions row={row} />, {resize: false})
]


// 定义自己的 Hooks
const useUser = (page: number) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const users = await superagent.get('/api/user')
        .send({
          page,
        });

      console.log('users.body', users, users.body);
      setUsers(users.body);
      setLoading(false);
    } catch(err) {
      throw err;
    }
  }

  useEffect(() => {
    setLoading(true);
    loadUsers();
  }, [page]);

  return [loading, users];
};



function User() {
  const [loading, users] = useUser(1);
  const listerComp = useRef(null);

  if (loading) {
    return <div>正在加载。。。</div>
  }


  console.log(users);

  return (
    <div>
      <div>
        <button>登录</button>
        <button>刷新</button>
      </div>
      <Lister
        ref={listerComp}
        rows={users}
        total={103}
        columns={columns}
        page={1}
        selectable={true}
      >
        <Button onClick={() => {listerComp.current.selectAll()}}>选择全部</Button>
      </Lister>
    </div>
  );
}

export default User;
