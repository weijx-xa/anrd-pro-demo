import React from 'react';
import { connect } from 'dva';
import { Button, Divider, Upload, Icon, message, Spin } from 'antd';
import XLSX from 'xlsx';
import router from 'umi/router';
import styles from './style.less';

const { Dragger } = Upload;

@connect(({ warehouse }) => ({
  excelData: warehouse.excelData,
}))
class Step1 extends React.PureComponent {
  state = {
    fileList: [],
    uploading: false,
    data: [],
  };

  beforeUpload = file => {
    const { data } = this.state;
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('单个文件应小于 2MB!');
      return false;
    }
    if (data.some(item => item.name === file.name)) {
      message.error('该文件已经存在，请检查上传列表!');
      return false;
    }
    this.setState({ uploading: true })

    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data2 = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update */
      if (data2[0][0] !== "到货入库") {
        message.error(`${file.name}好像不是入库单，请检查文件!`);
        this.setState({uploading: false})
      } else {
        this.setState(state => {
          return {
            fileList: [...state.fileList, file],
            data: [...state.data, { name: file.name, data: data2 }],
            uploading: false,
          };
        });
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  }

  onRemove = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      const newData = state.data.filter(item => item.name !== file.name);
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
        data: newData,
      };
    });
  }

  onValidateForm = () => {
    const { dispatch } = this.props;
    const { data } = this.state;
    // const data = fakedata;
    const columns = data[0].data[1].map((item, index) => ({ title: item, dataIndex: index, key: index }));
    const newData = [];
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index].data;
      for (let j = 0; j < element.length; j+=1) {
        const item = element[j];
        if (item.length === 0) break;
        if (j>1) newData.push({...item});
      }
    }
    dispatch({
      type: 'warehouse/saveExcelData',
      payload: {
        columns,
        newData
      },
    });
    router.push('/material/excelImport/confirm');
  };

  render() {
    // const { dispatch, step } = this.props;
    const { uploading, fileList } = this.state;
    return (
      <Spin tip="Loading..." spinning={uploading}>
        <div className={styles.stepForm}>
          <Dragger
            onRemove={this.onRemove}
            beforeUpload={this.beforeUpload}
            accept=".xls, .xlsx"
            fileList={fileList}
            multiple
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击 或 拖拽入库单文件到此</p>
            <p className="ant-upload-hint">一次可以上传多个入库单。后缀为.xls或.xlsx，单个文件不大于2M。</p>
          </Dragger>
        </div>
        <div>
          <Button style={{ margin: '0 35vw' }} type="primary" onClick={() => this.onValidateForm()} disabled={fileList.length === 0}>
            下一步
          </Button>
        </div>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Spin>
    );
  }
}

export default Step1;
