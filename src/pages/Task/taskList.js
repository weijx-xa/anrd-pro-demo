import React, { Component } from 'react';
import { Table, Modal, Input, message, Badge, Popover, Typography } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import moment from 'moment';
import styles from './list.less';

const { TextArea } = Input;
const pdata = [
  { value: 0, label: '查询PON口' },
  { value: 1, label: '更换光猫' },
  { value: 2, label: 'FTTB开端口' },
  { value: 3, label: '设备侧数据丢失' },
  { value: 4, label: '新装固话' },
  { value: 6, label: 'BOSS开单' },
];
const taskStr = (paraCode, par) => {
  switch (paraCode) {
    case 0:
      return (
        <>
          <span>查询 SN码</span>
          <span className={styles.neirong}>{par.sn}</span>
          <span>所在PON口</span>
        </>
      );
    case 1:
      return (
        <>
          <span>更换光猫 新SN码</span>
          <span className={styles.neirong}>{par.newsn}</span>
          <span>，旧SN码</span>
          <span className={styles.neirong}>{par.oldsn}</span>
        </>
      );
    case 2:
      return (
        <>
          <span>开通 SN码</span>
          <span className={styles.neirong}>{par.sn}</span>
          <span>的ONU，第</span>
          <span className={styles.neirong}>{par.port}</span>
          <span>口</span>
        </>
      );
    case 3:
      return (
        <>
          <span>用户 账号</span>
          <span className={styles.neirong}>{par.acc}</span>
          <span>，光猫SN</span>
          <span className={styles.neirong}>{par.sn}</span>
          <span>，数据丢失，需配置</span>
        </>
      );
    case 4:
      return (
        <>
          <span>用户 账号</span>
          <span className={styles.neirong}>{par.acc}</span>
          <span>，光猫SN</span>
          <span className={styles.neirong}>{par.sn}</span>
          <span>，开通固话业务</span>
        </>
      );
    case 6: {
      // const content = [
      //   { name:'账号', value:par.acc },
      //   { name:'联系方式', value:par.tel },
      //   { name:'装机地址', value:par.address },
      //   { name:'分纤箱', value:par.fqxNo },
      //   { name:'类型', value:par.isFtth?'FTTH':'FTTB' },
      //   { name:'套餐', value:par.taocan },
      // ];
      return (
        // <>
        //   {[...content, ...par.extattr].map(item => <><span>{item.name}：</span><span className={styles.neirong}>{item.value}</span>。</>)}
        // </>
        <>
          {[
            <span key="acc">账号</span>,
            <span key="acc2" className={styles.neirong}>
              {par.acc}
            </span>,
            <span key="tel">，联系方式</span>,
            <span key="tel2" className={styles.neirong}>
              {par.phone}
            </span>,
            <span key="address">，装机地址</span>,
            <span key="address2" className={styles.neirong}>
              {par.address}
            </span>,
            <span key="fqxNo">，分纤箱</span>,
            <span key="fqxNo2" className={styles.neirong}>
              {par.fqxNo}
            </span>,
            <span key="isFtth">，类型</span>,
            <span key="isFtth2" className={styles.neirong}>
              {par.isFtth ? 'FTTH' : 'FTTB'}
            </span>,
            <span key="taocan">，套餐</span>,
            <span key="taocan2" className={styles.neirong}>
              {par.taocan}。
            </span>,
          ]}
          <Popover
            content={par.extattr.map(item => (
              <p style={{ margin: '0 auto' }} key={item.name}>
                <span>{item.name}:</span>
                <span className={styles.neirong}>{item.value}</span>
              </p>
            ))}
            title="额外信息"
          >
            <a>更多...</a>
          </Popover>
        </>
      );
    }
    default:
      return null;
  }
};

export default class ListTable extends Component {
  constructor(props) {
    super(props);
    this.enterAnim = [
      {
        opacity: 0,
        backgroundColor: '#fffeee',
        duration: 0,
      },
      {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd,
      },
      {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: 'easeOutQuad',
      },
      { delay: 1000, backgroundColor: '#fff' },
    ];
    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: 'easeOutQuad' },
    ];
    this.state = {
      remark: '',
      visible: false,
      theTaskId: NaN,
      filteredInfo: {
        status: ['待接单', '已接单'],
      },
    };
  }

  handleChange = (pagination, filters) => {
    // console.log('Various parameters', pagination, filters);
    this.setState({
      filteredInfo: filters,
    });
  };

  acceptTask = id => {
    const { dispatch, logininfo } = this.props;
    dispatch({
      type: 'task/updateTask',
      payload: {
        option: 'accept',
        id,
        deal_man: logininfo.name,
      },
      callback: mess => {
        if (mess === 'ok') {
          message.success('工单接收成功！');
        } else {
          message.warning(mess);
        }
      },
    });
  };

  endTask = () => {
    // console.log(this.state.theTaskId,this.state.remark)
    const { dispatch, logininfo } = this.props;
    const { theTaskId, remark } = this.state;
    this.setState({ visible: false, theTaskId: NaN, remark: '' });
    dispatch({
      type: 'task/updateTask',
      payload: {
        option: 'end',
        id: theTaskId,
        remark: remark === '' ? '工单完成' : remark,
        deal_man: logininfo.name,
      },
      callback: mess => {
        if (mess === 'ok') {
          message.success('工单完成！');
        } else {
          message.warning(mess);
        }
      },
    });
  };

  handleCancel = () => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  inputChange = e => {
    // console.log(e.target.value);
    this.setState({
      remark: e.target.value,
    });
  };

  render() {
    const { data, loading, departlist } = this.props;
    const { remark, visible, theTaskId } = this.state;
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        render: (text, record, index) => index,
      },
      {
        title: '班组',
        dataIndex: 'dep_id',
        key: 'dep_id',
        width: 150,
        render: text => {
          if (departlist.length === 0) return text;
          const myDepartment = departlist.find(item => item.id === text);
          return myDepartment.name;
          // const mydepart = departlist.department.filter(item => item.id === text)[0];
          // if(!mydepart)return text;
          // if(mydepart.id === 1)return mydepart.name;
          // const parentdepart = departlist.department.filter(item => item.id === mydepart.parentid)[0];
          // return mydepart.parentid === 1?mydepart.name:`${parentdepart.name}-${mydepart.name}`;
        },
      },
      {
        title: '申请人',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 80,
      },
      {
        title: '申请类型',
        dataIndex: 'para_code',
        key: 'para_code',
        width: 130,
        render: text => pdata.find(item => item.value === text).label,
      },
      {
        title: '申请时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 130,
        sorter: (a, b) => moment(a.create_time).valueOf() - moment(b.create_time).valueOf(),
        render: text => moment(text).format('HH:mm:ss'),
      },
      {
        title: '申请内容',
        dataIndex: 'par',
        key: 'par',
        render: (text, record) => taskStr(record.para_code, record.par),
      },
      {
        title: '申请状态',
        dataIndex: 'status',
        key: 'status',
        width: 130,
        filters: [
          { text: '待接单', value: '待接单' },
          { text: '已接单', value: '已接单' },
          { text: '已完成', value: '已完成' },
        ],
        filteredValue: filteredInfo.status,
        onFilter: (value, record) => record.status.includes(value),
        render: (text, record) => {
          if (text === '待接单') return <Badge status="success" text="待接单" />;
          if (text === '已接单')
            return <Badge status="processing" text={`${record.deal_man}已接单`} />;
          return <Badge status="default" text={`${record.deal_man}${text}`} />;
        },
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'action',
        width: '12vw',
        render: (text, record) => {
          if (text === '待接单') return <a onClick={() => this.acceptTask(record.id)}>接单</a>;
          if (text === '已接单')
            return (
              <a onClick={() => this.setState({ visible: true, theTaskId: record.id })}>回复</a>
            );
          return (
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: true }}
              style={{ marginBottom: 0 }}
            >
              {record.remark}
            </Typography.Paragraph>
          );
        },
      },
    ];
    // 使用 Number.isNaN 代替全局的 isNaN. eslint: no-restricted-globals
    const theTask = Number.isNaN(theTaskId) ? '' : data.filter(item => item.id === theTaskId)[0];
    const body = {};
    body.wrapper = props => (
      <TweenOneGroup
        component="tbody"
        {...props}
        className={props.className}
        enter={this.enterAnim}
        leave={this.leaveAnim}
        appear={false}
        exclusive
      >
        {props.children}
      </TweenOneGroup>
    );
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          locale={{ emptyText: '暂无数据' }}
          components={{ body }}
          loading={loading}
          onChange={this.handleChange}
        />
        {!Number.isNaN(theTaskId) && (
          <Modal
            title="回复工单"
            okText="完成"
            cancelText="返回"
            visible={visible}
            onOk={this.endTask}
            onCancel={this.handleCancel}
            destroyOnClose
          >
            <p>申请内容：{taskStr(theTask.para_code, theTask.par)}</p>
            <p>回复内容：</p>
            <TextArea
              placeholder="默认回复：工单完成"
              autosize={{ minRows: 2, maxRows: 6 }}
              value={remark}
              onChange={e => this.inputChange(e)}
            />
          </Modal>
        )}
      </>
    );
  }
}
