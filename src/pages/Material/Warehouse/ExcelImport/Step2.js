import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import router from 'umi/router';
// import styles from './style.less';

@connect(({ warehouse }) => ({
  excelData: warehouse.excelData,
}))
class Step2 extends React.PureComponent {
  render() {
    const { excelData, dispatch } = this.props;
    if (excelData.newData.length === 0) {
      router.push('/material/excelImport/info');
      return null;
    }
    const onPrev = () => {
      router.push('/material/excelImport/info');
    };
    const onValidateForm = () => {
      dispatch({
        type: 'warehouse/submitForm',
        payload: excelData,
      });
    };
    return (
      <Fragment>
        <div>
          <Table dataSource={excelData.newData} columns={excelData.columns} rowKey={0} />
        </div>
        <div style={{ margin: '0 35vw' }}>
          <Button type="primary" onClick={onValidateForm}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default Step2;
