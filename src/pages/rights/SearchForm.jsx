import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import {connect} from 'react-redux'
import { getList } from '../../redux/rights.redux'

const { Item, create } = Form

@connect(
    state=>state.rights,
    {getList}
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
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
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