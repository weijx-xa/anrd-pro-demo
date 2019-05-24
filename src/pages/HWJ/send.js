import React, { PureComponent } from 'react';

class HWJsend extends PureComponent {
  static defaultProps = {
    color: 'blue',
    text: 'http://jartto.wang',
  };

  componentDidMount() {}

  render() {
    const { color } = this.props;
    return <div>{color}</div>;
  }
}

export default HWJsend;
