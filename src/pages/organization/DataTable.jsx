import React, { PureComponent } from 'react'
import { Table, Divider } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, getList } from '../../redux/organization.redux'

@connect(
  state => state.organization,
  { handleModalForm, getList }
)
class DataTable extends PureComponent {
  handleInfo = (type, open, data) => {
    this.props.handleModalForm(type, open, data)
  }
  handleTableChange = (pagination) => {
    let values = this.props.searchForm
    //配入分页条件
    values.pagenum = pagination.current
    values.pagesize = pagination.pageSize
    this.props.getList(values)
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: text => {
        if (text == 0) {
          return (<div>启用</div>)
        } else {
          return (<div>停用</div>)
        }
      }
    },
    {
      title: '创建者',
      dataIndex: 'creatorid',
      key: 'creatorid',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      align: 'center',
    },
    {
      title: '管理企业',
      dataIndex: 'ismanagerplatform',
      key: 'ismanagerplatform',
      align: 'center',
      render: text => {
        if (text == 1) {
          return (<div>是</div>)
        } else {
          return (<div>否</div>)
        }
      }
    },
    {
      title: (<div>操作<Divider type="vertical" />
        <a href="javascript:;" onClick={() => this.handleInfo('add', true)}>新增</a></div>),
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.handleInfo('edit', true, record)}>编辑</a>
        </span>
      )
    }]
    return (
      <Table
        rowKey={record => record.id}
        dataSource={this.props.dataList}
        columns={columns}
        pagination={this.props.pagination}
        onChange={this.handleTableChange}
      />
    )
  }
}
export default DataTable