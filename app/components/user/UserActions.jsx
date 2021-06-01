import * as React from 'react';
import {Button, openSheet, closeSheet, Confirm} from 'react-miniui';
import UserForm from '~/components/user/UserForm';

export default class UserActions extends React.Component {

  handleOpenSheet() {
    const {user} = this.props;

    openSheet('修改用户', <UserForm user={user} />, {direction: 'rtl'});
  }

  handleRemove() {
    Confirm("您确定要删除此用户吗，当前只是测试！", () => {

    })
  }

  render() {
    return(
      <>
        <Button color="green" size="tiny" onClick={this.handleOpenSheet.bind(this)}>编辑</Button>
        <Button color="red" size="tiny" onClick={this.handleRemove.bind(this)}>删除</Button>
      </>
    )
  }
}
