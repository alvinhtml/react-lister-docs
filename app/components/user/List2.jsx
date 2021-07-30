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
