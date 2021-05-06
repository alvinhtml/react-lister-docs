import * as React from 'react';
import {Button} from 'react-miniui';

export default class UserActions extends React.Component {
  render() {
    return(
      <>
        <Button color="green" size="tiny">编辑</Button>
        <Button color="red" size="tiny">删除</Button>
      </>
    )
  }
}
