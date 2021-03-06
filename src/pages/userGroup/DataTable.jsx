import React, { PureComponent } from 'react'
import { Table, Divider, Popconfirm, Tag } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, deleteInfo, getList } from '../../redux/usergroup.redux'

@connect(
  state => state.usergroup,
  { handleModalForm, deleteInfo, getList }
)
class DataTable extends PureComponent {
  handleInfo = (type, open, data) => {
    this.props.handleModalForm(type, open, data)
  }
  handleDelete = (id) => {
    this.props.deleteInfo(id)
  }
  handleTableChange = (pagination) => {
    let values = this.props.searchForm
    //配入分页条件
    values.pagenum = pagination.current
    values.pagesize = pagination.pageSize
    this.props.getList(values)
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: text => {
          if (text === 0) {
            return (<div>启用</div>)
          } else {
            return (<div>停用</div>)
          }
        }
      },
      // {
      //   title: '角色',
      //   dataIndex: 'roles',
      //   key: 'roles',
      //   align: 'center',
      //   render: text => {
      //     console.log(text)
      //     return (<div>{1}</div>)
      //   }
      // },
      // {
      //   title: '用户',
      //   dataIndex: 'users',
      //   key: 'users',
      //   align: 'center',
      //   render: text => {
      //     console.log(text)
      //     return (<div>{1}</div>)
      //   }
      // },
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
        render: text => {
          return text?text.substr(0,10):''
        }
      }, {
        title: (<div>操作<Divider type='vertical' />
          <a href='javascript:;' onClick={() => this.handleInfo('add', true)}>新增</a></div>),
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            <a href='javascript:;' onClick={() => this.handleInfo('update', true, record)}>编辑</a>
            {/* <Divider type='vertical' />
          <Popconfirm title='确认删除?' onConfirm={() => this.handleDelete(record.id)}>
            <a href='javascript:;'>删除</a>
          </Popconfirm> */}
          </span>
        )
      }

    ];
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