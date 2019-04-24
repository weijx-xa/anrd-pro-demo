import React, { Component } from 'react';
import { connect } from 'dva';
// import moment from 'moment';
import { Card, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TaskList from './taskList';
import styles from './index.less';

@connect(({ task, loading }) => ({
  onlinetasklist: task.onlinetasklist,
  loading: loading.effects['task/getTaskList'],
}))
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: true,
    };
  }

  componentDidMount() {
    this.changeby();
  }

  componentWillUnmount() {}

  changeby = (e = '') => {
    const by = e === '' ? 'online' : e.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'task/getTaskList',
      payload: {
        jwt: localStorage.getItem(`hzttweb-jwt`),
        by,
      },
    });
    this.setState({ isOnline: by === 'online' });
  };

  renderForm() {
    return (
      <Radio.Group defaultValue="online" onChange={this.changeby}>
        <Radio.Button value="online">查看当前工单</Radio.Button>
        <Radio.Button value="finsh">本日已完成工单</Radio.Button>
      </Radio.Group>
    );
  }

  render() {
    const { onlinetasklist, dispatch } = this.props;
    const { isOnline } = this.state;
    return (
      <PageHeaderWrapper title="手工工单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {isOnline ? <TaskList data={onlinetasklist.data} dispatch={dispatch} /> : 321}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default IndexPage;
