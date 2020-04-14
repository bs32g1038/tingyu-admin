import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import style from './index.module.scss';

export declare type color = 'volcano' | 'green' | 'geekblue' | 'default';

interface Props extends SwitchProps {
  color?: color;
}

export default class _Switch extends React.PureComponent<Props, {}> {
  render() {
    const { color } = this.props;
    return (
      <Switch
        className={color && classnames(style[color])}
        size="small"
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        {...this.props}
      />
    );
  }
}
