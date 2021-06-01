import * as React from 'react';
import {Button, Row, Input, openSheet, closeSheet} from 'react-miniui';


export default class UserActions extends React.Component {

  render() {
    return(
      <div>
        <div className="flex">
          <div className="flex-control-label">用户名</div>
          <div className="flex-controls">
            <Input block="true" type="text" placeholder="请输入用户名" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-control-label">邮箱</div>
          <div className="flex-controls">
            <Input block="true" type="text" span="8" placeholder="请输入邮箱" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-control-label"></div>
          <div className="flex-controls">
            <Button color="blue">提交修改</Button>
          </div>
        </div>
      </div>
    )
  }
}
