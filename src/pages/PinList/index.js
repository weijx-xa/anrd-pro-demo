import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Icon } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicList.less';

@connect(({ pinlist, loading }) => ({
  pinlist: pinlist.list,
  loading: loading.models.pinlist,
}))
class BasicList extends PureComponent {
  state = {
    searchValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pinlist/fetchPinList',
      payload: {
        jwt: localStorage.getItem(`jwt`),
      },
    });
  }

  onChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  emitEmpty = () => {
    this.treeSearch.focus();
    this.setState({ searchValue: '' });
  };

  render() {
    const { loading } = this.props;
    let { pinlist } = this.props;
    const { searchValue } = this.state;
    const suffix = searchValue ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : (
      <Icon type="search" />
    );
    const extraContent = (
      <div className={styles.extraContent}>
        <Input
          placeholder="搜索短信内容"
          value={searchValue}
          onChange={this.onChange}
          suffix={suffix}
          ref={node => {
            this.treeSearch = node;
          }}
        />
      </div>
    );
    if (searchValue !== '') {
      pinlist = pinlist.filter(item => item.content.includes(searchValue));
    }

    const paginationProps = {
      showSizeChanger: true,
      // showQuickJumper: true,
      pageSize: 10,
      // total: 50,
    };

    return (
      <PageHeaderWrapper title="短信列表">
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title={
              searchValue === ''
                ? `共计 ${pinlist.length} 条`
                : `包含 "${searchValue}" 的 ${pinlist.length} 条`
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              // size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={pinlist}
              renderItem={item => {
                const index = item.content.indexOf(searchValue);
                const beforeStr = item.content.substr(0, index);
                const afterStr = item.content.substr(index + searchValue.length);
                const theText =
                  index > -1 ? (
                    <span>
                      {beforeStr}
                      <span style={{ color: '#f50' }}>{searchValue}</span>
                      {afterStr}
                    </span>
                  ) : (
                    <span>{item.content}</span>
                  );
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={`${moment(item.date).format('HH:mm:ss')} from:${item.from}`}
                      description={theText}
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
