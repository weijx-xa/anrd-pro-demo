import React from 'react';
import { connect } from 'dva';
import { Transfer, Cascader, Row, Col, Icon, Tooltip } from 'antd';
import { depToTree } from '@/utils/convert';
import styles from './style.less';

@connect(({ global }) => ({
  department: global.department,
}))
class RoleTransfer extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i += 1) {
      const data = {
        key: i.toString(),
        name: `员工${i + 1}`,
        dep: `XX区县 ${i + 1}班组`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  render() {
    const { mockData, targetKeys } = this.state;
    const { department } = this.props;
    const depList = depToTree(department);
    return (
      <div style={{ width: '70vw', margin: '0 auto' }}>
        <Row style={{ marginBottom: 20 }}>
          <Col span={4}>
            <div style={{ textAlign: 'right', marginTop: 5, marginRight: 20 }}>
              <h4>
                选择部门:
                <Tooltip title="只获取本部门,不会递归获取子部门下面的成员。">
                  <Icon type="info-circle" className={styles.tipIcon} />
                </Tooltip>
              </h4>
            </div>
          </Col>
          <Col span={16}>
            <Cascader
              options={depList}
              onChange={this.onChange}
              style={{ width: '100%' }}
              changeOnSelect
            />
          </Col>
        </Row>
        <Transfer
          dataSource={mockData}
          titles={['待添加员工', '已添加员工']}
          showSearch
          listStyle={{
            width: '30vw',
            height: '50vh',
          }}
          operations={['添加', '去除']}
          targetKeys={targetKeys}
          onChange={this.handleChange}
          render={item => `${item.name}-${item.dep}`}
          // footer={this.renderFooter}
        />
      </div>
    );
  }
}

export default RoleTransfer;
