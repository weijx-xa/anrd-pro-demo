import React from 'react'
import {
  AutoComplete,
  Row,
  Col,
  Button,
} from 'antd';
import debounce from 'lodash/debounce';

const { Option } = AutoComplete;

class AddPerson extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: '',
    fetching: true,
    response: [],
  };

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true});
    fetch(`/hwj/searchUser?searchText=${value}`)
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        if (body.errmsg) {
          return;
        }
        const data = body.map(user => ({
          text: `${user['姓名']} ${user['手机号码']} ${user['地市']} ${user['区县']}`,
          value: user.id,
        }));
        this.setState({ data, response: body });
      });
  };

  handleChange = value => {
    this.setState({
      value,
    });
  };

  selectUser = value => {
    this.setState({ fetching: false, value });
  };

  buttonOnClick = () => {
    const { addUser } = this.props;
    const { response, value } = this.state;
    const userInfo = response.find(item => item.id === Number.parseInt(value, 10));
    this.setState({
      fetching: true,
      data: [],
      value: '',
    });
    addUser(userInfo);
  }

  render() {
    const { fetching, data, value } = this.state;
    return (
      <Row>
        <Col span={20}>
          <AutoComplete
            allowClear
            style={{ width: '95%' }}
            onSearch={this.fetchUser}
            placeholder="根据 姓名 或 手机号码 添加发送人员。"
            onSelect={this.selectUser}
            onChange={this.handleChange}
            value={value}
          >
            {data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </AutoComplete>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={this.buttonOnClick} disabled={fetching}>
            添加
          </Button>
        </Col>
      </Row>

    );
  }
}

export default AddPerson;