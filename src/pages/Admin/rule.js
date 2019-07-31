import React from 'react';
import { connect } from 'dva';
import { Card, Table, Input, Badge, Divider, Button, Select, Radio } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './rule.css';

const { Search } = Input;
const { Option } = Select;

const apps = {
  wcgjpc: '微材管家-PC端',
  wcgjwx: '微材管家-微信端',
  other: '其他应用',
};

const types = {
  1: '前端菜单',
  2: '后端接口',
};

const ruleStatus = [{ text: '停用', status: 'error' }, { text: '在用', status: 'success' }];

class RulePage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.department.department[1]);
    this.columns = [
      {
        title: '序号',
        // dataIndex: 'id',
        key: 'id',
        width: 60,
        render: (text, record, index) => index,
      },
      {
        title: '应用',
        dataIndex: 'app',
        key: 'app',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select defaultValue={text} style={{ width: '9vw' }} onChange={() => {}}>
                {Object.keys(apps).map(item => (
                  <Option key={item} value={item}>
                    {apps[item]}
                  </Option>
                ))}
              </Select>
            );
          }
          return apps[text];
        },
      },
      {
        title: '规则',
        dataIndex: 'name',
        key: 'name',
        className: styles.namecol,
        render: (text, record) => {
          if (record.editable) {
            return <Input style={{ width: '8vw' }} placeholder="规则" />;
          }
          return text;
        },
      },
      {
        title: '规则描述',
        dataIndex: 'title',
        key: 'title',
        className: styles.namecol,
        render: (text, record) => {
          if (record.editable) {
            return <Input style={{ width: '8vw' }} placeholder="描述" />;
          }
          return text;
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select defaultValue="1" style={{ width: '6vw' }} onChange={() => {}}>
                {Object.keys(types).map(item => (
                  <Option key={item} value={item}>
                    {types[item]}
                  </Option>
                ))}
              </Select>
            );
          }
          return types[text];
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
        title: '附加规则',
        dataIndex: 'condition',
        key: 'condition',
        render: (text, record) => {
          if (record.editable) {
            return <Input style={{ width: '6vw' }} placeholder="附加规则" />;
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 110,
        render: (text, record) => (
          <span>
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
        ),
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
      type: 'admin/fetchRules',
    });
  }

  static getDerivedStateFromProps(nextProps) {
    // console.log(nextProps.dataSource)
    if (nextProps.rules.length > 0) {
      return {
        data: nextProps.rules,
      };
    }
    return null;
  }

  newData = () => {
    const { data } = this.state;
    const target = data.filter(item => item.isNew)[0];
    if (target) return;
    const newData = {
      key: `NEW_TEMP_ID_${this.index}`,
      app: 'wcgjpc',
      name: '',
      title: '',
      type: 1,
      status: 1,
      condition: '',
      editable: true,
      isNew: true,
    };
    this.index += 1;
    this.setState(prevState => ({ data: [newData, ...prevState.data] }));
  };

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

  render() {
    const { data } = this.state;
    const content = '这里是权限规则表管理页面。';
    const action = (
      <>
        <Search
          placeholder="规则搜索"
          // onSearch={value => this.onSearch(value)}
          className={styles.search}
        />
        <Button
          icon="plus"
          type="primary"
          onClick={() => {
            this.newData();
          }}
        >
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
      <PageHeaderWrapper title="规则菜单" content={content} action={action}>
        <Card bordered={false}>
          <Table
            dataSource={data}
            columns={this.columns}
            rowKey="id"
            rowClassName={record => (record.editable ? styles.actionrow : '')}
            components={{ body }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = ({ admin, loading }) => ({
  rules: admin.rules,
  loading: loading.effects['admin/queryRules'],
});

export default connect(mapStateToProps)(RulePage);
