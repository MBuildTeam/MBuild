import React, { PureComponent } from 'react'
import {Table,Divider} from 'antd'
import {connect} from 'react-redux'

class MenuTable extends PureComponent {

    render() {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            key: '3',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            key: '5',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            key: '6',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }];
          
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
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize:10}}/>
        )
    }
}
export default MenuTable