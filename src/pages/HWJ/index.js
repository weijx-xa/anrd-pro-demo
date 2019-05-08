import React, { PureComponent } from 'react';
import sha1 from 'sha1';
import { stringify } from 'qs';
import styles from './index.less';

class HWJedit extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const params = {
      appid: 'qlxjp5lbj0okdfq4qepbnq',
      appkey: 'i3ufybswl0y6yi1wrs3xc6b85mcrjsrh7go',
      username: '李鹏',
      ts: Math.round(new Date().getTime() / 1000).toString(),
    };
    // eslint-disable-next-line compat/compat
    params.sign = sha1(Object.values(params).join(''));
    const url = encodeURIComponent(`https://www.wjx.cn/partner/login.aspx?${stringify(params)}`);
    const script = document.createElement('script');
    script.src = `https://www.wjx.cn/handler/loginemed.ashx?url=${url}&width=100%&height=100%`;
    script.async = true;
    this.myRef.appendChild(script);
    // console.log(this.instance.clientHeight)
  }

  render() {
    return <div ref={this.myRef} className={styles.instance} />;
  }
}

export default HWJedit;
