import React, {Component, useState, useEffect, useRef} from 'react';
import superagent from 'superagent';
import List from '~/components/user/List';

import {Button} from 'react-miniui';



// 定义自己的 Hooks
const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(['name', 'asc']);

  const loadUsers = async () => {

    try {
      const users = await superagent.get('/api/user')
        .query({
          page,
          order: `${order[0]},${order[1]}`
        });

      setUsers(users.body);
      setLoading(false);
    } catch(err) {
      throw err;
    }
  }

  useEffect(() => {
    setLoading(true);
    loadUsers();
  }, [page, order]);


  return [loading, users, (page, order) => {
    setPage(page);
    setOrder(order);
  }];
};


const rowKey = 'id';

function User() {
  const [loading, users, reload] = useUser();
  console.log(users);

  return (
    <div>
      <List
        rows={users}
        rowKey={rowKey}
        reload={({page, order}) => {
          console.log(page, order);
          reload(page, order);
        }}
      />
    </div>
  );
}


export default User;
