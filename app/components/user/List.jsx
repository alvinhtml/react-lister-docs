import * as React from 'react';
import {ButtonGroup, Button, Input, FormGroup} from 'react-miniui';

import Lister, {Column, withLister} from '~/../../react-lister/dist/index.js';
import'~/../../react-lister/dist/lister.css';
import UserActions from '~/components/user/UserActions';

class UserList extends React.Component {
  liste = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectedIDs: []
    };
  }

  toggleSelectAll() {
    console.log("this.liste", this.liste);
    this.liste.current.toggleSelectAll();
  }

  handleSelect = (selectedIDs: Array<string>) => {
    this.setState({
      selectedIDs
    });
  };

  render() {

    const {toggleSelectAll, rows, reload, createRef, columns} = this.props;

    const {selectedIDs} = this.state;

    console.log("columns-", columns);

    return (
      <div>
        <Lister
          ref={createRef}
          rows={rows}
          total={103}
          columns={columns}
          page={1}
          selectable={true}
          onSelect={this.handleSelect}
          reload={reload}
        >
          <ButtonGroup>
            <Button color="blue" onClick={toggleSelectAll}>全选</Button>
          </ButtonGroup>
          <FormGroup>
            <Input type="text" />
            <Button color="teal">搜索</Button>
          </FormGroup>
        </Lister>
      </div>
    );
  }
}

const options = {
  order: true, // 是否需要排序
  visibility: true, // 是否可见
  width: 200, // 列表的初始宽度，默认 200
  resize: true // 是否允许拖动改变列宽度
}

export default withLister(UserList, 'user', [
  new Column('用户', 'name', row => <span>{row.name}</span>, options),
  new Column('邮箱', 'email', row => <span>{row.email}</span>, options),
  new Column('角色', 'type', row => <span>{row.type}</span>, options),
  new Column('操作', null, row => <UserActions row={row} />, {resize: false})
]);
