import * as React from 'react';
import {ButtonGroup, Button, Input, FormGroup, Dropdown, Menu, Item, Icon, Confirm, Alert} from 'react-miniui';

import Lister, {Column, withLister} from 'react-lister';
import 'react-lister/dist/lister.css';

// import Lister, {Column, withLister} from '~/../../react-lister/dist/index.js';
// import '~/../../react-lister/dist/lister.css';

import UserActions from '~/components/user/UserActions';

const options = {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 180, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
}

function UserRole({user}) {
  return user.type === 0 ? '超级管理员' : '普通用户';
}

function UserState({user}) {
  return user.state !== 0 ? '停用' : '启用';
}

const userColumns = [
  new Column('ID', 'id', row => <React.Fragment>{row.id}</React.Fragment>, {...options, width: 60}),
  new Column('用户', 'name', row => <React.Fragment>{row.name}</React.Fragment>, {...options, getter: Column.Getter('name')}),
  new Column('邮箱', 'email', row => <span>{row.email}</span>, {...options, getter: Column.Getter('email')}),
  new Column('角色', 'type', row => <UserRole user={row} />, options),
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

  handleChange() {

  }

  handleRemove() {
    Confirm(
      '您确定要删除所选用户吗？',
      () => {
        Alert('删除成功！')
      },
      <Button color="red">删除1111</Button>
    )
  }

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
          <ButtonGroup>
            <Button onClick={toggleSelectAll}>全选</Button>
          </ButtonGroup>
          <FormGroup>
            <Button onClick={this.handleRemove.bind(this)}>删除{selectedIDs.length ? `(${selectedIDs.length})` : ''}</Button>
            <Button>停用{selectedIDs.length ? `(${selectedIDs.length})` : ''}</Button>
            <Dropdown name="phone" value="iphone" onChange={this.handleChange.bind(this)}>
        			<Button>更多 <Icon icon="fa-down-dir" /></Button>
        			<Menu dropArrow={true}>
        				<Item value="iphone">启用</Item>
        				<Item value="ipad">设为超级管理员</Item>
        			</Menu>
        		</Dropdown>
          </FormGroup>
        </Lister>
      </div>
    );
  }
}

export default withLister(UserList, 'user', userColumns);
