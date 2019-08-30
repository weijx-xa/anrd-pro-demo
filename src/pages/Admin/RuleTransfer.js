import React from 'react';
import { connect } from 'dva';
import { Transfer } from 'antd';

@connect(({ admin }) => ({
  rules: admin.rules,
}))
class RoleTransfer extends React.Component {
  state = {
    targetKeys: [],
  };

  componentDidMount() {
    const { dispatch, rules } = this.props;
    if (rules.length === 0) {
      dispatch({
        type: 'admin/fetchRules',
      });
    }
    // this.getMock();
  }

  // getMock = () => {
  //   const targetKeys = [];
  //   const mockData = [];
  //   for (let i = 0; i < 20; i += 1) {
  //     const data = {
  //       key: i.toString(),
  //       name: `员工${i + 1}`,
  //       dep: `XX区县 ${i + 1}班组`,
  //       chosen: Math.random() * 2 > 1,
  //     };
  //     if (data.chosen) {
  //       targetKeys.push(data.key);
  //     }
  //     mockData.push(data);
  //   }
  //   this.setState({ mockData, targetKeys });
  // };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  render() {
    const { rules } = this.props;
    const { targetKeys } = this.state;
    console.log(rules);

    return (
      <div style={{ width: '70vw', margin: '0 auto' }}>
        <Transfer
          dataSource={rules}
          titles={['待添加权限', '已添加权限']}
          showSearch
          listStyle={{
            width: '30vw',
            height: '50vh',
          }}
          operations={['添加', '去除']}
          targetKeys={targetKeys}
          onChange={this.handleChange}
          render={item => `${item.app}-${item.title}-${item.status}`}
          // footer={this.renderFooter}
        />
      </div>
    );
  }
}

export default RoleTransfer;
