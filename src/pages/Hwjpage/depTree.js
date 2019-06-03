import React from 'react'
import { Tree } from 'antd';

const { TreeNode } = Tree;

class DepTree extends React.Component {
  state = {
    expandedKeys: ['1'],
    autoExpandParent: false,
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  // onSelect = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  // };

  // onCheck = (checkedKeys, info) => {
  //   console.log('onCheck', checkedKeys, info);
  // };

  renderTreeNodes = depart =>{
    const {depList} = this.props;
    const data = depList.filter(item => item.parentid === depart.id);
    if (data.length === 0) {
      return null;
    }
    return data.map(item => {
      return (
        <TreeNode title={item.name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item)}
        </TreeNode>
      );
    });
  }

  render() {
    const { checkedKeys, depOnCheck } = this.props;
    const { expandedKeys, autoExpandParent } = this.state;

    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={depOnCheck}
        checkedKeys={checkedKeys}
        // onSelect={this.onSelect}
        // selectedKeys={selectedDep}
      >
        <TreeNode title='陕西分公司' key={1}>
          {this.renderTreeNodes({id:1, name:'陕西分公司', parentid:0})}
        </TreeNode>
      </Tree>
    );
  }
}

export default DepTree;
