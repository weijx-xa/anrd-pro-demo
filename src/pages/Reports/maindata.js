import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { stringify } from 'qs';
import styles from './index.less';

class ReportsMainData extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const params = {
      departmentid: 3308,
      department: '汉中市',
      position: '高级管理员',
      userid: '18091651659',
      name: '李鹏',
    };
    const Iframe = document.createElement('iframe');
    Iframe.src = `http://122.77.240.123:9208/Reports/maindata.htm?${stringify(params)}`;
    Iframe.width = "100%";
    Iframe.height = "100%";
    this.myRef.current.appendChild(Iframe);
    // console.log(this.instance.clientHeight)
  }

  render() {
    return (
      <Card bordered={false}>
        <div ref={this.myRef} className={styles.instance} />
      </Card>
    );
  }
}

export default ReportsMainData;
