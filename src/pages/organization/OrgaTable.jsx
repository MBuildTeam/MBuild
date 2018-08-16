import React, { PureComponent } from 'react'
import { Table, Divider } from 'antd'
import { connect } from 'react-redux'
import { getList } from '../../redux/organization.redux'

@connect(
  state => state.organization,
  { getList }
)
class OrgaTable extends PureComponent {
  componentDidMount() {
    //this.props.getList()
    console.log(1)
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'Name',
      key: 'Name',
    }, {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render: text => {
        if (text == 1) {
          return (<div>启用</div>)
        } else
          if (text == 2) {
            return (<div>不启用</div>)
          } else {
            return null
          }
      }
    }, {
      title: '创建者',
      dataIndex: 'Creator',
      key: 'Creator',
    }, {
      title: '创建时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
    }, {
      title: '管理平台',
      dataIndex: 'IsManagerPlatform',
      key: 'IsManagerPlatform',
      render: text => {
        if (text) {
          return (<div>是</div>)
        } else {
          return (<div>否</div>)
        }
      }
    }, {
      title: '关键字',
      dataIndex: 'KeyWord',
      key: 'KeyWord',
    }, {
    title: (<div>操作<Divider type="vertical" />
    <a href="javascript:;">新增</a></div>),
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      )
    }

    ];
    return (

      <Table
        rowKey={record => record.ID}
        dataSource={this.props.orgaList}
        columns={columns}
        pagination={{ pageSize: 10 }} />
    )
  }
}
export default OrgaTable