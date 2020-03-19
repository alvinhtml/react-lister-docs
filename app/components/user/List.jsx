import * as React from 'react';
import {Button} from 'react-miniui';

import Lister, {Column, withLister} from '~/../../react-lister/dist/index.js';
import'~/../../react-lister/dist/lister.css';
import UserActions from '~/components/user/UserActions';


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

class UserList extends React.Component {
  lister = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectedIDs: []
    };
  }

  toggleSelectAll() {
    this.lister.current.toggleSelectAll();
  }

  handleSelect = (selectedIDs: Array<string>) => {
    this.setState({
      selectedIDs
    });
  };

  render() {

    const {selectAll, users} = this.props;

    const {selectedIDs} = this.state;

    console.log("selectedIDs", selectedIDs);

    return (
      <div>
        <Lister
          ref={this.lister}
          rows={users}
          total={103}
          columns={columns}
          page={1}
          selectable={true}
          onSelect={this.handleSelect}
        >
          <Button type="basic" onClick={this.toggleSelectAll.bind(this)}>选择全部</Button>
        </Lister>
      </div>
    );
  }
}

console.log("withLister--", withLister);

export default withLister(UserList);
