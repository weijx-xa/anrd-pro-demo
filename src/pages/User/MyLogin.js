import React, { Component } from 'react';
import { connect } from 'dva';
import QRCode from 'qrcode.react';
import io from 'socket.io-client';
import { Icon, Skeleton } from 'antd';
import styles from './Login.less';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class MyLoginPage extends Component {
  state = {
    loginToken: '',
  };

  componentDidMount = () => {
    const { dispatch } = this.props;

    this.socket = io('http://sxtsqy.cttsn.com:7001/login', {
      // 实际使用中可以在这里传递参数
      // query: {
      //   userId: 1
      // },

      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log(`connect! id:${this.socket.id}`);
      this.token = this.socket.id.substr(-20);
      this.setState({ loginToken: this.socket.id.substr(-20) });
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
      this.setState({ loginToken: '' });
    });

    this.socket.on('reconnect', () => {
      console.log('reconnect');
      this.setState({ loginToken: this.socket.id.substr(-20) });
    });

    this.socket.on('loginSucceed', data => {
      dispatch({
        type: 'login/login',
        payload: {
          status: 'ok',
          currentAuthority: 'admin',
          jwt: data,
        },
      });
    });
  };

  componentWillUnmount = () => {
    this.socket.close();
  };

  render() {
    const { loginToken } = this.state;
    const wxauthurl = `http://sxtsqy.cttsn.com:7001/login/redirect?token=sxttpc_${loginToken}`;
    return (
      <div className={styles.main}>
        <div className={styles.loginbox}>
          <div className={styles.qrcode}>
            {loginToken === '' ? <Skeleton /> : <QRCode value={wxauthurl} size={250} level="L" />}
          </div>
          <div className={styles.content}>
            <span>
              <Icon
                type="wechat"
                style={{ fontSize: 20, display: 'inline-block', verticalAlign: 'middle' }}
              />{' '}
              进入微信或企业微信
            </span>
            <br />
            <span>
              <Icon
                type="qrcode"
                style={{ fontSize: 20, display: 'inline-block', verticalAlign: 'middle' }}
              />{' '}
              点击‘扫一扫’，扫码登录
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MyLoginPage;
