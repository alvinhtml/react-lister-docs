import React, {Component, useState, useEffect, useRef} from 'react';
import superagent from 'superagent';
import List from '~/components/user/List';

import {Button} from 'react-miniui';



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

  if (loading) {
    return <div>正在加载。。。</div>
  }


  console.log(users);

  return (
    <div>
      <List
        users={users}
        reLoad={() => {

        }}
      />
    </div>
  );
}

export default User;
