import React, { Component } from 'react';
import { connect } from 'dva';
// import moment from 'moment';
import io from 'socket.io-client';
import { Card, Badge } from 'antd';
import { getUserInfo } from '@/utils/authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TaskList from './taskList';
import styles from './index.less';

@connect(({ task, loading }) => ({
  tasklist: task.tasklist,
  departlist: task.departlist,
  loading: loading.effects['task/getTaskList'],
  logininfo: getUserInfo(),
}))
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.loadTaskList();
    this.socket = io('https://ali.hzttweb.com:7001/task', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log(`connect! id:${this.socket.id}`);
    });

    this.socket.on('taskupdate', data => {
      console.log('taskupdate', data);
      dispatch({
        type: 'task/updateOnlineTaskList',
        payload: JSON.parse(data),
      });
    });

    this.socket.on('disconnect', () => {
      this.setState({ isOnline: false });
    });

    this.socket.on('reconnect', () => {
      this.setState({ isOnline: true });
    });
  }

  componentWillUnmount() {
    this.socket.close(1005);
  }

  loadTaskList = () => {
    const { dispatch, logininfo } = this.props;
    dispatch({
      type: 'task/getTaskList',
      payload: {
        jwt: localStorage.getItem(`hzttweb-jwt`),
        role: logininfo.role,
      },
    });
  };

  render() {
    const { tasklist, dispatch, logininfo, departlist } = this.props;
    const { isOnline } = this.state;
    return (
      <PageHeaderWrapper title="手工工单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {isOnline ? (
                <Badge status="success" text="与服务器连接正常" />
              ) : (
                <Badge status="error" text="与服务器连接断开" />
              )}
            </div>
            <TaskList
              data={tasklist}
              dispatch={dispatch}
              logininfo={logininfo}
              departlist={departlist}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default IndexPage;
