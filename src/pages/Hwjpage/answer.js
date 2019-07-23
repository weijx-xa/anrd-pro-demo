import React, { PureComponent } from 'react';
import { Table, Card, Tooltip, Modal, Tag } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { getTimelength } from '@/utils/utils';
import styles from './style.less';

@connect(({ hwj, loading }) => ({
  answerList: hwj.answerList,
  answerInfos: hwj.answerInfo,
  loading: loading.effects['hwj/queryAnswerList'],
}))
class AnswerList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/queryAnswerList',
    });
  }

  showAnswer = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/queryAnswerInfo',
      payload: record,
      callback: contents => {
        Modal.info({
          title: `${record.姓名}在${record.name}的回答`,
          width: '70vw',
          content: (
            <div>
              {contents.map(item => (
                <p>{item}</p>
              ))}
            </div>
          ),
          onOk() {},
        });
      },
    });
  };

  render() {
    const { answerList, loading } = this.props;
    const columns = [
      {
        title: '类型',
        dataIndex: 'fullscore',
        render: text => (text ? <Tag color="blue">考试</Tag> : <Tag color="green">问卷</Tag>),
      },
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
        title: '试卷名称',
        dataIndex: 'name',
        render: (text, record) => <Tooltip title={`ID:${record.activity}`}>{text}</Tooltip>,
      },
      {
        title: '提交时间',
        dataIndex: 'submittime',
        render: text => moment(text).format('M-DD H:mm'),
      },
      {
        title: '答题时长',
        dataIndex: 'timetaken',
        render: text => getTimelength(text),
      },
      {
        title: '得分',
        dataIndex: 'totalvalue',
        render: (text, record) => (
          <span>
            {record.totalvalue}/{record.fullscore}
          </span>
        ),
      },
      {
        title: '其他',
        dataIndex: 'answer',
        render: (text, record) => (
          <span>
            <a onClick={() => this.showAnswer(record)}>答案</a>
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
