import React, { Fragment } from 'react';
// import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

// @connect(({ warehouse }) => ({
//   excelData: warehouse.excelData,
// }))
class Step3 extends React.PureComponent {
  render() {
    // const { data } = this.props;
    const onFinish = () => {
      router.push('/material/excelImport/info');
    };
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再次上传
        </Button>
        <Button>查看库存</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="上传成功"
        description="点击下方按钮查看库存。"
        // extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
