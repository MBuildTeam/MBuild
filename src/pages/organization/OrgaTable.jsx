import React, { PureComponent } from 'react'
import { Table, Divider } from 'antd'
import { connect } from 'react-redux'

class MenuTable extends PureComponent {

  render() {
    const dataSource = [];
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];


    return (
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
    )
  }
}
export default MenuTable