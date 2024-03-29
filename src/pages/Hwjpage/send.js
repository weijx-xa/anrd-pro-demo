import React, { PureComponent } from 'react';
import { Card, Button, Form, Select, Row, Col, Table, message, Popover } from 'antd';
import { connect } from 'dva';
import QRCode from 'qrcode.react';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagsSelect from './TagsSelect';
import AddPerson from './addPerson';
import styles from './style.less';

const { Option } = Select;

@connect(({ hwj, loading }) => ({
  questList: hwj.questList,
  sendUsers: hwj.sendUsers,
  questInfo: hwj.questInfo,
  selectedUserIds: hwj.selectedUserIds,
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class HWJsend extends PureComponent {
  state = {
    width: '100%',
    step: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
    dispatch({
      type: 'hwj/queryQuestList',
      payload: '',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  questionOnChange = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/queryQuestInfo',
      payload: {
        qid: value,
      },
      callback: (qid, step) => {
        this.setState({ step });
      },
    });
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  selectUsers = selectedRowKeys => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/saveUserIds',
      payload: selectedRowKeys,
    });
  };

  addUser = userInfo => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hwj/addSendUsers',
      payload: userInfo,
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log('Received error of form: ', error);
      // console.log('Received values of form: ', values);
      if (!error) {
        dispatch({
          type: 'hwj/queryUserList',
          payload: {
            ...values,
            jwt: localStorage.getItem('hzttweb-jwt'),
          },
          callback: () => {
            this.setState({ step: 2 });
          },
        });
      }
    });
  };

  finalSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      selectedUserIds,
      questList,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const thisQuest = questList.find(item => item.qid === values.qid);
        dispatch({
          type: 'hwj/finalSubmit',
          payload: {
            ...values,
            selectedUserIds,
            qname: thisQuest.name,
            jwt: localStorage.getItem('hzttweb-jwt'),
          },
          callback: () => {
            this.setState({ step: 0 });
            message.success('提交成功！');
          },
        });
      }
    });
  };

  render() {
    const { form, submitting, questList, questInfo, sendUsers, selectedUserIds } = this.props;
    const { width, step } = this.state;

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: selectedRowKeys => this.selectUsers(selectedRowKeys),
      selectedRowKeys: selectedUserIds,
    };
    const columns = [
      {
        title: '姓名',
        dataIndex: '姓名',
      },
      {
        title: '手机号码',
        dataIndex: '手机号码',
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
        title: '维护专业',
        dataIndex: '维护专业',
      },
      {
        title: '职务',
        dataIndex: '职务',
      },
      {
        title: '业务条线',
        dataIndex: '业务条线',
      },
      {
        title: '性别',
        dataIndex: '性别',
      },
      {
        title: '学历',
        dataIndex: '学历',
      },
      {
        title: '在职状态',
        dataIndex: '在职状态',
      },
      {
        title: '用工方式',
        dataIndex: '用工方式',
      },
      {
        title: '政治面貌',
        dataIndex: '政治面貌',
      },
    ];

    return (
      <PageHeaderWrapper
        title="发送人员选择"
        content="高级表单常见于一次性输入和提交大批量数据的场景。"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="问卷选择" className={styles.card} bordered={false}>
          <Row>
            <Col span={4}>
              <div className={styles.likeLabel}>
                <h4>发送问卷</h4>
              </div>
            </Col>
            <Col span={16}>
              {form.getFieldDecorator('qid')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择需要发送的问卷"
                  onChange={this.questionOnChange}
                >
                  {questList.map(item => (
                    <Option key={item.qid} label={item.name}>
                      问卷名称：{item.name}；问卷ID：{item.qid}；开始时间：{item.begindate}
                    </Option>
                  ))}
                </Select>
              )}
            </Col>
            <Col span={4}>
              {typeof questInfo.qid !== 'undefined' && (
                <div style={{ marginTop: 10, marginLeft: 20 }}>
                  <Popover
                    content={
                      <QRCode
                        value={`http://sxtsqy.cttsn.com:7001/hwjwx/jump?qid=${questInfo.qid}`}
                        size={150}
                        level="L"
                      />
                    }
                    title="分享二维码到微信"
                  >
                    <a>二维码</a>
                  </Popover>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              * 此接口会有10分钟的缓存时间，新增的问卷可能需要10分钟以后才能获取。
            </Col>
          </Row>
        </Card>
        <Card
          title="属性选择"
          className={styles.card}
          bordered={false}
          actions={[
            <Button type="primary" disabled={step <= 0} onClick={this.validate}>
              确认属性
            </Button>,
          ]}
          loading={step <= 0}
        >
          <h4>
            {questInfo.userid === ''
              ? '该问卷待编辑发送属性。'
              : `该问卷由${questInfo.username}(${questInfo.userid}) 于 ${questInfo.updated_at} 编辑。`}
          </h4>
          <TagsSelect form={form} questInfo={questInfo} />
        </Card>
        <Card title="发送人员列表" className={styles.card} bordered={false} loading={step < 2}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <AddPerson addUser={this.addUser} />
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={sendUsers}
              rowKey="id"
            />
            ,
          </div>
        </Card>
        <FooterToolbar style={{ width }}>
          共计发送{selectedUserIds.length}人
          <Button
            type="primary"
            onClick={this.finalSubmit}
            loading={submitting}
            disabled={step !== 2}
          >
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default HWJsend;
