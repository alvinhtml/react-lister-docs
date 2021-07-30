import React, {Component, useState, useEffect, useRef} from 'react';
import superagent from 'superagent';
import List from '~/components/user/List2';

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
      const users = await superagent.get('/api/user')
        .query({
          page,
          order,
          limit,
          search
        });

      this.setState({
        users: users.body,
        total: users.header['x-total'] // 
        // total: users.body.length //
      })

    } catch(err) {
      throw err;
    }
  }

  render() {
    const {users, total} = this.state;

    // 给 list 传递一个 reload 方法用于后端分页
    //
    console.log("users", users);

    return (
      <div>
        <List
          rows={users}
          total={400}
          rowKey={rowKey}
          reload={(pagination) => {
            const {page, limit, order, search} = pagination;
            this.loadUser(page, limit, order, search);
          }}
        />
      </div>
    );
  }
}

export default User;
