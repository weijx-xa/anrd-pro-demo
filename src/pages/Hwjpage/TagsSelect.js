import React, { PureComponent } from 'react';
import { Form, Select, Divider, Modal, Tag, Tooltip, Icon } from 'antd';
import DepTree from './depTree';
import depList from '@/../mock/geographic/department.json';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const countyList = depList.filter(item => item.id < 999999);

const fakeColName = [
  {
    name: '职务',
    value: [
      '总经理',
      '副总经理',
      '经理',
      '副经理',
      '机关部门经理',
      '业务经理',
      '业务主管',
      '班组长',
      '业务员',
      '电信业务员',
      '话务员',
      '无',
    ],
  },
  { name: '业务条线', value: ['维护条线', '市场条线', '工程条线', '综合条线', '其他'] },
  { name: '性别', value: ['男', '女'] },
  {
    name: '学历',
    value: ['初中', '技校', '中专', '职高', '高中', '大专', '大本', '研究生', '硕士'],
  },
  { name: '在职状态', value: ['实习期', '在职', '离职'] },
  { name: '用工方式', value: ['合作企业(代理)', '合作企业(外包)', '合同制', '派遣制'] },
  { name: '政治面貌', value: ['中共党员', '共青团员', '民主党派', '群众'] },
];
const fakeColName2 = {
  name: '维护专业',
  value: [
    '生产管理',
    '家集客后台支撑',
    '家集客装维',
    '一体化装维',
    '一体化后台支撑',
    '非装维工作',
    '无',
  ],
  children: [
    { name: '生产管理', value: ['家集客生产管理', '一体化生产管理'] },
    { name: '家集客后台支撑', value: ['家客支撑', '集客支撑', '客服专家坐席'] },
    { name: '家集客装维', value: ['家客装机', '家客维护', '家客装维一体', '集客维护'] },
    {
      name: '一体化装维',
      value: ['基站及配套、发电', '传输光缆维护', '铁塔及天馈维护', 'WLAN维护', '室分及直放站维护'],
    },
    { name: '一体化后台支撑', value: ['一体化支撑'] },
    { name: '非装维专业', value: ['非装维专业'] },
  ],
};
const allJobs = fakeColName2.children.reduce(
  (accumulator, currentValue) => [...accumulator, ...currentValue.value],
  []
);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 16 },
  },
};
class TagsSelect extends PureComponent {
  state = {
    checkedKeys: [],
    depModalVisible: false,
    countyIds: [],
  };

  static getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.questInfo.CountyId === 'undefined') return null;
    return { countyIds: nextProps.questInfo.CountyId };
  }

  showModal = () => {
    const { countyIds } = this.state;
    this.setState({
      checkedKeys: countyIds,
      depModalVisible: true,
    });
  };

  handleOk = () => {
    const { checkedKeys } = this.state;
    const {
      form: { setFieldsValue },
    } = this.props;
    const countyIds = checkedKeys.filter(key => key.length === 6);
    setFieldsValue({ CountyId: countyIds });
    this.setState({
      countyIds,
      depModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      depModalVisible: false,
    });
  };

  depOnCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  tagClose = removedTag => {
    const { countyIds } = this.state;
    const newIds = countyIds.filter(tag => tag !== removedTag);
    this.setState({
      countyIds: newIds,
    });
  };

  render() {
    const {
      form: { getFieldDecorator, setFieldsValue },
      questInfo,
    } = this.props;
    const { checkedKeys, depModalVisible, countyIds } = this.state;
    console.log(questInfo);
    return (
      <>
        <FormItem key="县区" {...formItemLayout} label="县区" required>
          {getFieldDecorator('CountyId', {
            rules: [
              {
                required: true,
                message: `至少选择一个县区！`,
              },
            ],
          })(
            <>
              {countyIds.map(key => {
                const depid = Number.parseInt(key, 10);
                const thisDep = depList.find(depart => depart.id === depid);
                const parentDep = depList.find(depart => depart.id === thisDep.parentid);
                const depName = `${parentDep.name}-${thisDep.name}`;
                const isLongTag = depName.length > 20;
                const tagElem = (
                  <Tag key={depid} closable onClose={() => this.tagClose(key)}>
                    {isLongTag ? `${depName.slice(0, 20)}...` : depName}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={depName} key={depid}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
            </>
          )}

          <Tag onClick={this.showModal} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="edit" /> 编辑部门
          </Tag>
        </FormItem>
        <FormItem {...formItemLayout} key={fakeColName2.name} label={fakeColName2.name}>
          {getFieldDecorator(fakeColName2.name, {
            initialValue: questInfo.维护专业,
            rules: [
              {
                required: true,
                message: `${fakeColName2.name}是必须的！`,
              },
            ],
          })(
            <Select
              mode="multiple"
              style={{ width: '85%' }}
              placeholder={`请选择${fakeColName2.name}！`}
            >
              {fakeColName2.children.map(item2 => (
                <OptGroup key={item2.name} label={item2.name}>
                  {item2.value.map(item3 => (
                    <Option key={item3}>{item3}</Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          )}
          <a
            style={{ marginLeft: 10 }}
            onClick={() => setFieldsValue({ [fakeColName2.name]: allJobs })}
          >
            全选
          </a>
          <Divider type="vertical" />
          <a style={{ marginLeft: 10 }} onClick={() => setFieldsValue({ [fakeColName2.name]: [] })}>
            重置
          </a>
        </FormItem>
        {fakeColName.map(item => (
          <FormItem {...formItemLayout} key={item.name} label={item.name}>
            {getFieldDecorator(item.name, {
              initialValue: questInfo[item.name],
              rules: [
                {
                  required: true,
                  message: `${item.name}是必须的！`,
                },
              ],
            })(
              <Select mode="multiple" style={{ width: '85%' }} placeholder={`请选择${item.name}！`}>
                {item.value.map(item2 => (
                  <Option key={item2}>{item2}</Option>
                ))}
              </Select>
            )}
            <a
              style={{ marginLeft: 10 }}
              onClick={() => setFieldsValue({ [item.name]: item.value })}
            >
              全选
            </a>
            <Divider type="vertical" />
            <a style={{ marginLeft: 10 }} onClick={() => setFieldsValue({ [item.name]: [] })}>
              重置
            </a>
          </FormItem>
        ))}
        <Modal
          title="选择发送的部门"
          visible={depModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <div style={{ height: 400, overflowY: 'auto' }}>
            <DepTree depList={countyList} checkedKeys={checkedKeys} depOnCheck={this.depOnCheck} />
          </div>
        </Modal>
      </>
    );
  }
}

export default TagsSelect;
