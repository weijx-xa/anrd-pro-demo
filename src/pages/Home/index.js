import React, { PureComponent } from 'react';
import { Row, Col, Card, Avatar, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

// 陕西铁通
const links1 = [
  {
    key: 0,
    name: '陕西OA',
    link: 'http://61.236.251.150/SDOA/sysadmin.nsf/index?openframeset',
    img: '陕西OA.png',
  },
  {

    key: 1,
    name: '资源管理',
    link: '',
    img: '资源管理.png',
  },
  {
    key: 2,
    name: '人员管理',
    link: '',
    img: '人员管理.png',
  },
  {
    key: 4,
    name: '统计分析',
    link: '',
    img: '统计分析.png',
  },
  {
    key: 5,
    name: '问卷调查',
    link: '',
    img: '问卷调查.png',
  },
  {
    key: 6,
    name: "物料管理",
    link: '',
    img: '物料管理.png',
  },
  {
    key: 6,
    name: '小区信息核查',
    link: '',
    img: '小区信息核查.png',
  },
  {
    key: 7,
    name: '仪器仪表维修',
    link: '',
    img: '仪器仪表维修.png',
  }
]
// 集团系统
const links2 = [
  {
    key: 1,
    name: '商旅100',
    link: 'http://b2bjoy.10086.cn/travel/enterprise/Manage/login.html',
    img: '商旅.png',
  },
  {
    key: 2,
    name: '电商平台',
    link: 'http://b2bjoy.10086.cn/oscp/enterprise/Manage/login.html',
    img: '电商.png',
  },
  {
    key: 3,
    name: '中移网大',
    link: 'https://wangda.andedu.net/oauth/#login/295946ce6debe526003ea00b45b5c0da',
    img: '中移网大.png',
  },
  {
    key: 4,
    name: '党建平台',
    link: 'http://dangjian.chinamobile.com/hq/',
    img: '党建.png',
  },
  {
    key: 5,
    name: '招标系统',
    link: 'https://b2b.10086.cn/b2b/main/preIndex.html',
    img: '招标.png',
  }
]
// 总部系统
const links3 = [
  {
    key: 1,
    name: '邮件系统',
    link: 'http://mail.cmtietong.com/user/?q=login&furl=http%3A%2F%2Fmail.cmtietong.com%2F%3Fq%3Dbase',
    img: '邮件.png',
  },
  {
    key: 2,
    name: '报账平台',
    link: 'https://211.98.239.122/prx/000/http/localhost/login',
    img: '报账平台.png',
  },
  {
    key: 4,
    name: '市场信息系统',
    link: 'http://10.0.170.33/Default.aspx',
    img: '市场信息系统.png',
  },
  {
    key: 5,
    name: '运维OA',
    link: 'http://10.0.170.38/web/default.aspx',
    img: '运维OA.png',
  },
  {
    key: 3,
    name: "NC系统",
    link: 'http://10.0.176.6/',
    img: 'NC系统.png',
  }
  ,
  {
    key: 6,
    name: '数据资源管理系统',
    link: 'http://10.0.170.176/SJZY/sjcl_client/login/login.htm',
    img: '数据资源.png',
  }
  ,
  {
    key: 7,
    name: '信息和产品开发管理',
    link: 'http://keji.cmtietong.com',
    img: '信息和产品开发.png',
  }
  ,
  {
    key: 8,
    name: '在线学习平台',
    link: 'http://xueyuan.cmtietong.com/Home/EduLogin',
    img: '在线学习.png',
  }
  ,
  {
    key: 9,
    name: '统一信息平台',
    link: 'http://10.0.40.113/',
    img: '统一信息平台.png',
  }
  ,
  {
    key: 10,
    name: '总部OA',
    link: 'http://10.0.170.6',
    img: '总部OA.png',
  }
  ,
  {
    key: 11,
    name: 'MIS系统',
    link: 'http://10.0.40.113/',
    img: 'MIS.png',
  }
  ,
  {
    key: 12,
    name: '物资采购系统',
    link: 'http://10.0.170.6',
    img: '物资采购.png',
  }
  ,
  {
    key: 13,
    name: '计划建设管理系统',
    link: 'http://10.0.170.40/Home/Login',
    img: '计划建设.png',
  }
  ,
  {
    key: 14,
    name: '人力资源办公管理系统',
    link: '',
    img: '人力资源.png',
  },
  {
    key: 16,
    name: '资源管理信息系统',
    link: '',
    img: '资源管理.png',
  },
  {
    key: 17,
    name: '供应链',
    link: 'http://10.0.40.66:9080/index.jsp',
    img: '供应链.png',
  }
]

const toNewLinks = (links) => {
  const count = links.length;
  const newLinks = [];
  for (let index = 0; index < count; index += 1) {
    const rowKey = Math.floor(index / 6);
    if (typeof newLinks[rowKey] === 'undefined') {
      newLinks[rowKey] = {
        rowKey,
        rowData: [],
      };
    }
    newLinks[rowKey].rowData.push(links[index]);
  }
  return newLinks;
}

const ossLink = 'https://alipublic.oss-cn-beijing.aliyuncs.com/img/';

class Home extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        title="首页"
        content="我的应用"
        hiddenBreadcrumb
      >
        <Card title="总部系统" className={styles.card} bordered={false}>
          {toNewLinks(links3).map((item) => (
            <Row gutter={16} style={{ marginBottom: 20 }} key={item.rowKey}>
              {item.rowData.map(item2 => (
                <Col className="gutter-row" span={4} key={item2.key}>
                  <a style={{ textAlign: 'center' }} href={item2.link} target="_blank" rel="noopener noreferrer">
                    <div><Avatar shape="square" size={64} src={`${ossLink}${item2.img}`} /></div>
                    <div><span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{item2.name}</span></div>
                  </a>
                </Col>
              ))}
            </Row>
          ))}
          <h1>陕西铁通</h1>
          <Divider />
          {toNewLinks(links1).map((item) => (
            <Row gutter={16} style={{ marginBottom: 20 }} key={item.rowKey}>
              {item.rowData.map(item2 => (
                <Col className="gutter-row" span={4} key={item2.key}>
                  <a style={{ textAlign: 'center' }} href={item2.link} target="_blank" rel="noopener noreferrer">
                    <div><Avatar shape="square" size={64} src={`${ossLink}${item2.img}`} /></div>
                    <div><span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{item2.name}</span></div>
                  </a>
                </Col>
              ))}
            </Row>
          ))}
          <h1>集团系统</h1>
          <Divider />
          {toNewLinks(links2).map((item) => (
            <Row gutter={16} style={{ marginBottom: 20 }} key={item.rowKey}>
              {item.rowData.map(item2 => (
                <Col className="gutter-row" span={4} key={item2.key}>
                  <a style={{ textAlign: 'center' }} href={item2.link} target="_blank" rel="noopener noreferrer">
                    <div><Avatar shape="square" size={64} src={`${ossLink}${item2.img}`} /></div>
                    <div><span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{item2.name}</span></div>
                  </a>
                </Col>
              ))}
            </Row>
          ))}
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Home;