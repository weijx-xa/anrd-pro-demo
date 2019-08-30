import React from 'react';
import { connect } from 'dva';
import { Card, Table, Input, Badge, Divider, Button, Select, Radio } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TransferModal from './TransferModal';
import styles from './rule.css';

const { Search } = Input;
const { Option } = Select;

const ruleStatus = [{ text: '停用', status: 'error' }, { text: '在用', status: 'success' }];

const domains = {
  0: '无权',
  1: '本人',
  2: '本级部门',
  3: '上一级部门',
  4: '全部',
};

class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        key: 'id',
        render: (text, record, index) => index,
      },
      {
        title: '角色名称',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="角色名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '可见范围',
        dataIndex: 'domain',
        key: 'domain',
        width: 200,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select defaultValue="1" style={{ width: '10vw' }} onChange={() => {}}>
                {Object.keys(domains).map(item => (
                  <Option key={item} value={item}>
                    {domains[item]}
                  </Option>
                ))}
              </Select>
            );
          }
          return domains[text];
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        className: styles.statuscol,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Radio.Group defaultValue="1" size="small">
                <Radio.Button value="0">停用</Radio.Button>
                <Radio.Button value="1">在用</Radio.Button>
              </Radio.Group>
            );
          }
          return <Badge status={ruleStatus[text].status} text={ruleStatus[text].text} />;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (record.title === '超级管理员') return '该角色不可编辑';
          return (
            <span>
              <a
                onClick={() => {
                  this.showModal('userlist', record.title);
                }}
              >
                编辑用户
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.showModal('ruleslist', record.title);
                }}
              >
                编辑权限
              </a>
              <Divider type="vertical" />
              {record.editable ? (
                <a
                  onClick={() => {
                    this.save(record.id);
                  }}
                >
                  保存
                </a>
              ) : (
                <a
                  onClick={() => {
                    this.edit(record.id);
                  }}
                >
                  编辑
                </a>
              )}
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.remove(record.id);
                }}
              >
                删除
              </a>
            </span>
          );
        },
      },
    ];
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
      data: [],
    };
    this.index = 0;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchUserGroup',
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.dataSource)
    if (nextProps.dataSource.length > 0 && prevState.data.length === 0) {
      return {
        data: nextProps.dataSource,
      };
    }
    return null;
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  newData = () => {
    const { data } = this.state;
    const target = data.filter(item => item.isNew)[0];
    if (target) return;
    const newData = {
      key: `NEW_TEMP_ID_${this.index}`,
      title: '',
      domain: 1,
      status: 1,
      editable: true,
      isNew: true,
    };
    this.index += 1;
    this.setState(prevState => ({ data: [newData, ...prevState.data] }));
  };

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.save(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  edit(key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = newData.filter(item => item.id === key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save(key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = newData.filter(item => item.id === key)[0];
    if (target) {
      delete target.editable;
      delete target.isNew;
      this.setState({ data: newData });
    }
  }

  remove(key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = newData.filter(item => item.id !== key);
    this.setState({ data: target });
  }

  showModal(showModal, thisTitle) {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/changeModal',
      payload: {
        visible: true,
        showModal,
        thisTitle,
      },
    });
  }

  render() {
    const { loading } = this.props;
    const { data } = this.state;
    const content = '这里是用户组管理页面。';
    const action = (
      <>
        <Search
          placeholder="搜索用户组"
          // onSearch={value => this.onSearch(value)}
          className={styles.search}
        />
        <Button icon="plus" type="primary" onClick={this.newData}>
          添加
        </Button>
      </>
    );
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
      <PageHeaderWrapper title="用户组管理" content={content} extraContent={action}>
        <Card bordered={false}>
          <Table
            dataSource={data}
            columns={this.columns}
            rowKey="id"
            rowClassName={record => (record.editable ? styles.actionrow : '')}
            components={{ body }}
            loading={loading}
          />
        </Card>
        <TransferModal />
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = ({ admin, loading }) => ({
  dataSource: admin.userGroup,
  loading: loading.effects['admin/fetchUserGroup'],
});

export default connect(mapStateToProps)(GroupPage);
