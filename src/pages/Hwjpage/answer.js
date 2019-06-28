import React, { PureComponent } from 'react';
import { Table, Card, Tooltip, Modal, Tag } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { getTimelength } from '@/utils/utils';
import styles from './style.less';

const answerInfo = [
  'title:问卷测试6-21',
  'q1:您的性别：',
  'q1#1:A男',
  'q1#2:B女',
  'q2:您的年龄：',
  'q2#1:A25岁以下',
  'q2#2:B26-35岁',
  'q2#3:C36-45岁',
  'q2#4:D45岁以上',
  'q3:您的最高学历：',
  'q3#1:A高中/中专及以下',
  'q3#2:B大专',
  'q3#3:C本科',
  'q3#4:D硕士及以上',
  'q4:您的工作年限：',
  'q4#1:A0-3个月',
  'q4#2:B3-6个月',
  'q4#3:C6个月-1年',
  'q4#4:D1-2年',
  'q4#5:E2年以上',
  'q5:您的工作类型：',
  'q5#1:A．销售类',
  'q5#2:B．支持辅助类',
  'q5#3:C.管理类',
  'q6:您对本人的工作岗位是否感到满意？',
  'q6#1:A很满意',
  'q6#2:B满意',
  'q6#3:C一般',
  'q6#4:D不满意',
  'q6#5:E极不满意',
  'q7:您对公司目前实施的工资方案的建议和意见：',
  'q8:你认为公司目前的福利政策还需进行哪方面的改善？',
  'q9:您希望公司未来做哪些方面的工作？(如公司战略规划、企业文化建设、员工职业规划、沟通渠道的建设等等)：',
  '',
];
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

  showAnswer = record => {
    const answer = JSON.parse(record.answer);
    const contents = Object.keys(answer).map(qid => {
      const thisQuest = answerInfo.find(item => item.indexOf(`${qid}:`) !== -1);
      const thisAnswer = () => {
        // 没有答案不是选择题
        if (answerInfo.some(item => item.indexOf(`${qid}#1`) === -1)) return answer[qid];
        // 是不是多选
        const answers = answer[qid].split(',');
        console.log(answers);

        if (answers.length === 1) {
          return answerInfo.find(item => item.indexOf(`${qid}#${answer[qid]}:`) !== -1);
        }
        return answers
          .map(aid => answerInfo.find(item2 => item2.indexOf(`${qid}#${aid}:`) !== -1))
          .join(',');
      };

      return (
        <p key={qid}>
          {thisQuest}
          {thisAnswer()}
        </p>
      );
    });
    Modal.info({
      title: `${record.姓名}在${record.name}的回答`,
      width: '70vw',
      content: <div>{contents}</div>,
      onOk() {},
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
