/* eslint-disable react/destructuring-assignment */
/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import Content5 from './Content5';
import Content2 from './Content2';
import './less/antMotionStyle.less';

const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const children = [
      // eslint-disable-next-line react/jsx-filename-extension
      <Content5
        id="Content5_0"
        key="Content5_0"
      />,
      <Content2
        id="Content2_0"
        key="Content2_0"
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
