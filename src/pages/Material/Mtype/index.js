import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Input,
  Table,
  Button,
  Badge,
  Divider,
  Popover,
  Avatar,
  Popconfirm,
  Icon,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
// import StandardTable from 'components/StandardTable';
// import XLSX from 'xlsx';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Mtype.less';

const materialStatus = [{ text: '停用', status: 'error' }, { text: '在用', status: 'success' }];
const management = ['一类一码', '一物一码'];

@connect(({ basic, loading }) => ({
  basic,
  loading: loading.effects['basic/fetchMtype'],
}))
class Mtype extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '材料类型',
        dataIndex: 'Type',
        key: 'Type',
        filters: [
          {
            text: '装维材料',
            value: '装维材料',
          },
          {
            text: '仪器仪表',
            value: '仪器仪表',
          },
        ],
        fixed: 'left',
        onFilter: (value, record) => record.Type.indexOf(value) === 0,
      },
      {
        title: '分类',
        dataIndex: 'Class',
        key: 'Class',
        fixed: 'left',
      },
      {
        title: '名称',
        dataIndex: 'Name',
        key: 'Name',
        fixed: 'left',
        width: 200,
      },
      {
        title: '规格型号',
        dataIndex: 'mSize',
        key: 'mSize',
        width: 270,
      },
      {
        title: '对应用友编码',
        dataIndex: 'yonyouId',
        key: 'yonyouId',
      },
      {
        title: '数量/长度',
        dataIndex: 'mNum',
        key: 'mNum',
      },
      {
        title: '单位',
        dataIndex: 'Units',
        key: 'Units',
      },
      {
        title: '单价(元)',
        dataIndex: 'Cost',
        key: 'Cost',
        sorter: (a, b) => a.Cost - b.Cost,
        render: text => numeral(text).format('0.00'),
      },
      {
        title: '状态',
        dataIndex: 'IsEnable',
        key: 'IsEnable',
        render: text => (
          <Badge status={materialStatus[text].status} text={materialStatus[text].text} />
        ),
      },
      {
        title: '管理方式',
        dataIndex: 'Management',
        key: 'Management',
        render: text => management[text],
      },
      {
        title: '自动预警',
        dataIndex: 'Alarm',
        key: 'Alarm',
        render: text => (text ? `${numeral(text / 100).format('%')}月用量` : '不预警'),
      },
      {
        title: '更新时间',
        dataIndex: 'UpdateTime',
        key: 'UpdateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '更新人',
        dataIndex: 'Updater',
        key: 'Updater',
        render: text => (
          <Popover
            content={
              <>
                县区支撑服务中心
                <br />
                西乡
                <br />
                城区服务站
              </>
            }
            title={
              <>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                {text}
              </>
            }
          >
            {text}
          </Popover>
        ),
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                this.edit(record);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="是否确认删除这条材料信息?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="是"
              cancelText="否"
            >
              <a onClick={() => {}}>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/fetchMtype',
    });
  }

  onChange = e => {
    this.setState({
      searchText: e.target.value,
    });
  };

  emitEmpty = () => {
    this.input.focus();
    this.setState({ searchText: '' });
  };

  edit = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/saveThisMaterial',
      payload: record,
    });
    dispatch(routerRedux.replace('/material/basicform'));
  };

  add = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/saveThisMaterial',
      payload: {},
    });
    dispatch(routerRedux.replace('/material/basicform'));
  };

  // exportFile = () => {
  //   const data = [];
  //   const col = [];
  //   const d = new Date();
  //   const {
  //     basic: { mtype },
  //   } = this.props;
  //   // 行转换
  //   this.columns.forEach(item => {
  //     if (item.title !== '操作') col.push(item.title);
  //   });
  //   data.push(col);
  //   // data转换
  //   mtype.forEach(item => {
  //     data.push(Object.values(item));
  //   });
  //   /* convert state to workbook */
  //   const ws = XLSX.utils.aoa_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  //   /* generate XLSX file and send to client */
  //   XLSX.writeFile(wb, `mtype${d.toLocaleDateString()}.xlsx`);
  // };

  render() {
    const { searchText } = this.state;
    const { basic, loading } = this.props;
    let data = basic.mtype;
    if (searchText !== '') {
      // eslint-disable-next-line compat/compat
      data = data.filter(item => JSON.stringify(Object.values(item)).indexOf(searchText) !== -1);
    }
    const suffix =
      searchText !== '' ? (
        <Icon type="close-circle" onClick={this.emitEmpty} />
      ) : (
        <Icon type="search" />
      );
    return (
      <PageHeaderWrapper title="材料科目管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Row>
                <Col span={8}>
                  {/* {selectedRowKeys.length > 0 &&
                    <span>已选择{selectedRowKeys.length}行 <a>批量删除</a></span>
                  } */}
                </Col>
                <Col span={16}>
                  <div className={styles.rightDiv}>
                    <Input
                      placeholder="搜索表格"
                      className={styles.search}
                      value={searchText}
                      onChange={this.onChange}
                      suffix={suffix}
                      ref={node => {
                        this.input = node;
                      }}
                    />
                    {/* <Button icon="download" size="default" onClick={this.exportFile}>
                      导出Excel
                    </Button> */}
                    <Button icon="plus" type="primary" onClick={this.add}>
                      添加
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            <Table
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey="id"
              pagination={{ showSizeChanger: true }}
              scroll={{ x: 1650 }}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Mtype;
