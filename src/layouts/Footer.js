import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '中国移动',
          title: '中国移动',
          href: 'http://www.10086.cn/aboutus/culture/intro/province_culture_intro/sn/',
          blankTarget: true,
        },
        {
          key: '中国移动(陕西) ',
          title: '中国移动(陕西) ',
          href: 'http://www.10086.cn/index/sn/index_290_290.html',
          blankTarget: true,
        },
        {
          key: '中移铁通',
          title: '中移铁通',
          href: 'http://www.cmtietong.com/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 中移铁通有限公司陕西分公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
