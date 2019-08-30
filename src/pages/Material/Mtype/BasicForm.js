import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  // DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Slider,
  // Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

@connect(({ basic, loading }) => ({
  thisMaterial: basic.thisMaterial,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { thisMaterial, submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    // console.log(thisMaterial)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const isAdd = Object.keys(thisMaterial).length === 0;
    const mytitle = isAdd ? '添加材料类型' : '修改材料类型';
    const breadcrumbList = [
      {
        title: '首页',
        href: '/',
      },
      {
        title: '材料科目管理',
        href: '/basic/mtype',
      },
      {
        title: mytitle,
      },
    ];
    return (
      <PageHeaderWrapper
        title={mytitle}
        // content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
        breadcrumbList={breadcrumbList}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="材料类型">
              {getFieldDecorator('Type', {
                initialValue: isAdd ? '装维材料' : thisMaterial.Type,
              })(
                <Radio.Group>
                  <Radio className={styles.radio1} value="装维材料">
                    装维材料
                  </Radio>
                  <Radio className={styles.radio1} value="仪器仪表">
                    仪器仪表
                  </Radio>
                  <Radio className={styles.radio1} value="其他">
                    其他
                    <Input
                      style={{
                        width: 120,
                        marginLeft: 10,
                        float: 'right',
                        display: getFieldValue('Type') === '3' ? 'block' : 'none',
                      }}
                    />
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="材料分类">
              {getFieldDecorator('Class', {
                rules: [
                  {
                    required: true,
                    message: '请输入或选择材料分类',
                  },
                ],
                initialValue: isAdd ? '' : thisMaterial.Class,
              })(
                <Select
                  mode="combobox"
                  style={{ width: '100%' }}
                  placeholder="材料分类"
                  onChange={() => {}}
                >
                  <Option key="皮线光缆">皮线光缆</Option>
                  <Option key="跳纤">跳纤</Option>
                  <Option key="热熔管">热熔管</Option>
                  <Option key="保护盒">保护盒</Option>
                  <Option key="网线">网线</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('Name', {
                rules: [
                  {
                    required: true,
                    message: '请输入材料名称',
                  },
                ],
                initialValue: isAdd ? '' : thisMaterial.Name,
              })(<Input placeholder="请输入材料名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="规格型号">
              {getFieldDecorator('Specification', {
                rules: [
                  {
                    required: true,
                    message: '请输入材料规格型号',
                  },
                ],
                initialValue: isAdd ? '' : thisMaterial.Specification,
              })(<Input placeholder="请输入材料规格型号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="对应用友编码">
              {getFieldDecorator('yonyouId', {
                rules: [
                  {
                    required: true,
                    message: '请输入材料对应用友编码',
                  },
                ],
                initialValue: isAdd ? '' : thisMaterial.yonyouId,
              })(<Input placeholder="请输入材料对应用友编码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="数量/长度">
              <Input.Group compact>
                {getFieldDecorator('Size', {
                  rules: [
                    {
                      required: true,
                      message: '请输入材料数量/长度',
                    },
                  ],
                  initialValue: isAdd ? '' : thisMaterial.Size,
                })(<InputNumber style={{ width: '30%' }} placeholder="数量" min={1} max={10000} />)}
                {getFieldDecorator('Units', {
                  rules: [
                    {
                      required: true,
                      message: '请输入材料单位',
                    },
                  ],
                  initialValue: isAdd ? '' : thisMaterial.Units,
                })(<Input style={{ width: '20%' }} placeholder="条" />)}
              </Input.Group>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  成本
                  <em className={styles.optional}>（元）</em>
                </span>
              }
              help="我觉得要是输入单价的话,一串小数实在太蠢了"
            >
              {getFieldDecorator('Cost', {
                rules: [
                  {
                    required: true,
                    message: '请输入材料成本',
                  },
                ],
                initialValue: isAdd ? '' : thisMaterial.Cost,
              })(
                <InputNumber
                  defaultValue={1000}
                  min={0}
                  style={{ width: '40%' }}
                  formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/¥\s?|(,*)/g, '')}
                  onChange={value => console.log('changed', value)}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('IsEnable', {
                initialValue: isAdd ? 1 : thisMaterial.IsEnable,
              })(
                <Radio.Group>
                  <Radio.Button value={0}>停用</Radio.Button>
                  <Radio.Button value={1}>在用</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="管理方式">
              {getFieldDecorator('Management', {
                initialValue: isAdd ? 0 : thisMaterial.Management,
              })(
                <Radio.Group>
                  <Radio.Button value={0}>一类一码</Radio.Button>
                  <Radio.Button value={1}>一物一码</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="自动预警阈值">
              {getFieldDecorator('Alarm', {
                initialValue: isAdd ? 10 : thisMaterial.Alarm,
              })(
                <Slider
                  max={300}
                  step={10}
                  tipFormatter={value => (value === 0 ? '不预警' : `${value}%月用量`)}
                />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
