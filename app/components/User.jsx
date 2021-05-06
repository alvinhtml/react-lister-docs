import React, {Component, useState, useEffect, useRef} from 'react';
import superagent from 'superagent';
import List from '~/components/user/List';

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

    // 1. 由前端实现分页，适用于数据条数较少的情况
    // 2. rows 接收所有数据
    // 3. 页面刷新时，会调用 reload  函数，更新 rows 数据
    const paginationMode = 'web-frontend';
    const reload = () => {
      this.loadUser();
    }

    // 1. 由服务端实现分页，适用于数据条数较多的情况
    // 2. rows 只接收当前页的数据
    // 3. Lister 在分页跳转，排序和搜索时，会调用 reload 函数，并传入 pagination 对象作为参数，pagination 对象，包含以下属性 page, limit, order, search
    // 4. 根据接收到的分页信息， 在 reload 函数中发送新的请求，并将结果（只含当前页数据）传给 rows
    // 5. 服务端 API 示例 `api/users?page=1&order=name&order=asc&search=name&search=John`
    // const paginationMode = 'server-api';
    // const reload = (pagination) => {
    //   const {page, limit, order, search} = pagination;
    //   this.loadUser(page, limit, order, search);
    // }


    console.log("-----------------------------------");
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
