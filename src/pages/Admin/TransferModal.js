import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import RoleTransfer from './RoleTreeTransfer';
import RuleTransfer from './RuleTransfer';

@connect(({ global, admin }) => ({
  modalState: admin.modalState,
  department: global.department,
}))
class TransferModal extends React.Component {
  handleOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/changeModal',
      payload: {
        visible: false,
      },
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/changeModal',
      payload: {
        visible: false,
      },
    });
  };

  onChange = value => {
    console.log(value);
  };

  render() {
    const { modalState } = this.props;
    return (
      <Modal
        title={
          modalState.showModal === 'userlist'
            ? `${modalState.thisTitle}角色员工管理`
            : `${modalState.thisTitle}角色权限管理`
        }
        visible={modalState.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
        width="80vw"
      >
        {modalState.showModal === 'userlist' && <RoleTransfer />}
        {modalState.showModal === 'ruleslist' && <RuleTransfer />}
      </Modal>
    );
  }
}

export default TransferModal;
