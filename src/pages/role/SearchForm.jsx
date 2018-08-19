import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { connect } from 'react-redux'
import { getList, getRightsList } from '../../redux/role.redux'

const { Item, create } = Form
const Option = Select.Option;

@connect(
    state => state.role,
    { getList, getRightsList }
)
@create({
    mapPropsToFields(props) {
        if (props.searchForm) {
            let fields = {}
            for (let key in props.searchForm) {
                fields[key] = Form.createFormField({
                    value: props.searchForm[key]
                })
            }
            return fields
        }
    }
})
class SearchForm extends PureComponent {
    componentDidMount() {
        this.props.getRightsList()
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                 console.log(values)
                this.props.getList(values)
            }
        })
    }
    handleReset = () => {
        this.props.form.resetFields()
        this.props.getList()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Item label="名称">
                            {getFieldDecorator('Name')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={18}>
                        <Item label="权限" style={{ width: '100%' }}>
                            {getFieldDecorator('Rights')(
                                <Select
                                mode="multiple"
                                style={{ minWidth: '200px' }}
                                >
                                {
                                    this.props.rightsList.map(item=>{
                                        return (
                                            <Option key={item.ID} value={item.ID}>{item.Name}</Option>
                                        )
                                    })
                                }
                                </Select>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm