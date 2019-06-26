import React, { PureComponent } from 'react';
import { Table, Card, Tooltip, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './style.less';

@connect(({ hwj, loading }) => ({
  answerList: hwj.answerList,
  loading: loading.effects['hwj/queryAnswerList'],
}))
class AnswerList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/queryAnswerList',
    });
  }

  showAnswer = str => {
    const answer = JSON.parse(str);
    console.log(answer);

    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const { answerList, loading } = this.props;
    const columns = [
      {
        title: '答题人',
        dataIndex: '姓名',
        render: (text, record) => (
          <Tooltip title={record.手机号码}>
            <span>{text}</span>
          </Tooltip>
        ),
      },
      {
        title: '地市',
        dataIndex: '地市',
      },
      {
        title: '区县',
        dataIndex: '区县',
      },
      {
        title: '班组名称',
        dataIndex: '班组名称',
      },
      {
        title: '用工方式',
        dataIndex: '用工方式',
      },
      {
        title: '试卷ID',
        dataIndex: 'activity',
      },
      {
        title: '试卷名称',
        dataIndex: 'name',
      },
      {
        title: '提交时间',
        dataIndex: 'submittime',
        render: text => moment(text).format('MM月DD日 H:mm'),
      },
      {
        title: '答题时长',
        dataIndex: 'timetaken',
        render: text =>
          `${moment.duration(text).get('hours')}小时${moment.duration(text).get('minutes')}分钟`,
      },
      {
        title: '得分',
        dataIndex: 'fullscore',
        render: (text, record) => (
          <span>
            {record.fullscore}/{record.totalvalue}
          </span>
        ),
      },
      {
        title: '其他',
        dataIndex: 'answer',
        render: text => (
          <span>
            <a onClick={() => this.showAnswer(text)}>答案</a>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper
        title="所有提交的答案"
        content="暂时用于显示所有已经提交的答案。"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="答案列表" className={styles.card} bordered={false}>
          <Table dataSource={answerList} columns={columns} loading={loading} rowKey="activity" />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AnswerList;
